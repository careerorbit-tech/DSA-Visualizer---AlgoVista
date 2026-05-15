const clone = (value) => JSON.parse(JSON.stringify(value));

let idCounter = 0;
const nextId = (prefix) => `${prefix}-${idCounter++}`;

class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.id = nextId('avl');
  }
}

const getHeight = (node) => (node ? node.height : 0);
const updateHeight = (node) => {
  if (node) {
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  }
};
const getBalance = (node) => (node ? getHeight(node.left) - getHeight(node.right) : 0);

const rotateRight = (node) => {
  const nextRoot = node.left;
  const moved = nextRoot.right;
  nextRoot.right = node;
  node.left = moved;
  updateHeight(node);
  updateHeight(nextRoot);
  return nextRoot;
};

const rotateLeft = (node) => {
  const nextRoot = node.right;
  const moved = nextRoot.left;
  nextRoot.left = node;
  node.right = moved;
  updateHeight(node);
  updateHeight(nextRoot);
  return nextRoot;
};

const createBinaryState = (tree, operation, step, currentNode = null, visitedNodes = [], completed = false) => ({
  tree: clone(tree),
  currentNode: currentNode ? clone(currentNode) : null,
  visitedNodes: clone(visitedNodes),
  operation,
  step,
  completed
});

export function* avlInsert(tree, value) {
  let step = 0;
  const workingTree = clone(tree);
  const visitedNodes = [];
  const events = [createBinaryState(workingTree, `Starting AVL insertion of ${value}`, step++)];

  const insertNode = (node) => {
    if (!node) {
      const nextNode = new AVLNode(value);
      events.push(createBinaryState(workingTree, `Create node ${value}`, step++, nextNode, visitedNodes));
      return nextNode;
    }

    visitedNodes.push({ id: node.id, value: node.value });
    events.push(createBinaryState(workingTree, `Compare ${value} with ${node.value}`, step++, node, visitedNodes));

    if (value < node.value) {
      node.left = insertNode(node.left);
    } else if (value > node.value) {
      node.right = insertNode(node.right);
    } else {
      events.push(createBinaryState(workingTree, `${value} already exists in the AVL tree`, step++, node, visitedNodes, true));
      return node;
    }

    updateHeight(node);
    const balance = getBalance(node);
    events.push(createBinaryState(workingTree, `Update height of ${node.value}; balance = ${balance}`, step++, node, visitedNodes));

    if (balance > 1 && value < node.left.value) {
      events.push(createBinaryState(workingTree, `Left-left imbalance at ${node.value}; rotate right`, step++, node, visitedNodes));
      return rotateRight(node);
    }
    if (balance < -1 && value > node.right.value) {
      events.push(createBinaryState(workingTree, `Right-right imbalance at ${node.value}; rotate left`, step++, node, visitedNodes));
      return rotateLeft(node);
    }
    if (balance > 1 && value > node.left.value) {
      events.push(createBinaryState(workingTree, `Left-right imbalance at ${node.value}; rotate left then right`, step++, node, visitedNodes));
      node.left = rotateLeft(node.left);
      return rotateRight(node);
    }
    if (balance < -1 && value < node.right.value) {
      events.push(createBinaryState(workingTree, `Right-left imbalance at ${node.value}; rotate right then left`, step++, node, visitedNodes));
      node.right = rotateRight(node.right);
      return rotateLeft(node);
    }

    return node;
  };

  workingTree.root = insertNode(workingTree.root);
  events.push(createBinaryState(workingTree, `AVL insertion completed for ${value}`, step++, null, visitedNodes, true));

  for (const event of events) {
    yield event;
  }
}

export function* avlSearch(tree, value) {
  let current = tree.root;
  const visited = [];
  let step = 0;

  yield createBinaryState(tree, `Starting AVL search for ${value}`, step++);

  while (current) {
    visited.push({ id: current.id, value: current.value });
    yield createBinaryState(tree, `Compare ${value} with ${current.value}`, step++, current, visited);

    if (current.value === value) {
      yield createBinaryState(tree, `Found ${value} in the AVL tree`, step++, current, visited, true);
      return;
    }
    current = value < current.value ? current.left : current.right;
  }

  yield createBinaryState(tree, `${value} is not present in the AVL tree`, step++, null, visited, true);
}

const traverseBinaryNodes = (root, type) => {
  const order = [];
  const visit = (node) => {
    if (!node) return;
    if (type === 'preorder') order.push(node);
    visit(node.left);
    if (type === 'inorder') order.push(node);
    visit(node.right);
    if (type === 'postorder') order.push(node);
  };

  if (type === 'levelorder') {
    const queue = root ? [root] : [];
    while (queue.length) {
      const node = queue.shift();
      order.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return order;
  }

  visit(root);
  return order;
};

export function* binaryTraversal(tree, type = 'inorder', label = 'Binary Tree') {
  const nodes = traverseBinaryNodes(tree.root, type);
  const visited = [];
  let step = 0;

  yield createBinaryState(tree, `Starting ${type} traversal on the ${label}`, step++);

  for (const node of nodes) {
    visited.push({ id: node.id, value: node.value });
    yield createBinaryState(tree, `Visit ${node.value} during ${type} traversal`, step++, node, visited);
  }

  yield createBinaryState(tree, `${type} traversal order: ${visited.map((node) => node.value).join(' -> ')}`, step++, null, visited, true);
}

export const createTraversalTree = () => ({
  root: {
    value: 8,
    id: nextId('bt'),
    left: {
      value: 3,
      id: nextId('bt'),
      left: { value: 11, id: nextId('bt'), left: null, right: null },
      right: { value: 5, id: nextId('bt'), left: null, right: null }
    },
    right: {
      value: 10,
      id: nextId('bt'),
      left: { value: 14, id: nextId('bt'), left: null, right: null },
      right: { value: 1, id: nextId('bt'), left: null, right: null }
    }
  }
});

export const createSampleAVLTree = () => ({
  root: {
    value: 30,
    id: nextId('avl'),
    height: 3,
    left: {
      value: 20,
      id: nextId('avl'),
      height: 2,
      left: { value: 10, id: nextId('avl'), height: 1, left: null, right: null },
      right: { value: 25, id: nextId('avl'), height: 1, left: null, right: null }
    },
    right: {
      value: 40,
      id: nextId('avl'),
      height: 2,
      left: { value: 35, id: nextId('avl'), height: 1, left: null, right: null },
      right: { value: 50, id: nextId('avl'), height: 1, left: null, right: null }
    }
  }
});

export const createSampleHeap = () => [90, 70, 55, 35, 50, 25, 20];

export const createSampleTrie = () => {
  const trie = createTrie();
  const words = ['cat', 'car', 'care', 'dog', 'dot'];
  for (const word of words) {
    let node = trie.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = createTrieNode(char);
      }
      node = node.children[char];
    }
    node.terminal = true;
  }
  return trie;
};

export const heapArrayToTree = (heap) => {
  const buildNode = (index) => {
    if (index >= heap.length) return null;
    return {
      value: heap[index],
      id: `heap-${index}`,
      left: buildNode(index * 2 + 1),
      right: buildNode(index * 2 + 2)
    };
  };
  return { root: buildNode(0) };
};

export function* heapInsert(initialHeap, value) {
  const heap = [...initialHeap];
  let step = 0;

  const state = (operation, currentIndex = null, compareIndex = null, completed = false) => ({
    heap: [...heap],
    tree: heapArrayToTree(heap),
    currentNode: currentIndex !== null ? { id: `heap-${currentIndex}`, value: heap[currentIndex] } : null,
    visitedNodes: compareIndex !== null ? [{ id: `heap-${compareIndex}`, value: heap[compareIndex] }] : [],
    operation,
    step,
    completed
  });

  yield state(`Insert ${value} at the end of the heap`);
  step++;
  heap.push(value);
  yield state(`Placed ${value} at index ${heap.length - 1}`, heap.length - 1);
  step++;

  let index = heap.length - 1;
  while (index > 0) {
    const parentIndex = Math.floor((index - 1) / 2);
    yield state(`Compare child ${heap[index]} with parent ${heap[parentIndex]}`, index, parentIndex);
    step++;
    if (heap[parentIndex] >= heap[index]) {
      break;
    }
    [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
    yield state(`Swap to restore max-heap order`, parentIndex, index);
    step++;
    index = parentIndex;
  }

  yield state(`Heap insertion completed`, null, null, true);
}

export function* heapExtractMax(initialHeap) {
  const heap = [...initialHeap];
  let step = 0;

  const state = (operation, currentIndex = null, compareIndex = null, completed = false) => ({
    heap: [...heap],
    tree: heapArrayToTree(heap),
    currentNode: currentIndex !== null && heap[currentIndex] !== undefined ? { id: `heap-${currentIndex}`, value: heap[currentIndex] } : null,
    visitedNodes: compareIndex !== null && heap[compareIndex] !== undefined ? [{ id: `heap-${compareIndex}`, value: heap[compareIndex] }] : [],
    operation,
    step,
    completed
  });

  if (!heap.length) {
    yield state('Heap is empty, nothing to extract', null, null, true);
    return;
  }

  yield state(`Extract max value ${heap[0]}`);
  step++;

  if (heap.length === 1) {
    heap.pop();
    yield state('Removed the only value in the heap', null, null, true);
    return;
  }

  heap[0] = heap.pop();
  yield state('Move last element to the root and sift down', 0);
  step++;

  let index = 0;
  while (true) {
    const left = index * 2 + 1;
    const right = index * 2 + 2;
    let largest = index;

    if (left < heap.length && heap[left] > heap[largest]) largest = left;
    if (right < heap.length && heap[right] > heap[largest]) largest = right;

    if (largest === index) break;

    yield state(`Compare root candidate with child ${heap[largest]}`, index, largest);
    step++;
    [heap[index], heap[largest]] = [heap[largest], heap[index]];
    yield state(`Swap to restore max-heap order`, largest, index);
    step++;
    index = largest;
  }

  yield state('Heap extraction completed', null, null, true);
}

const createTrieNode = (label = '') => ({
  id: nextId('trie'),
  label,
  terminal: false,
  children: {}
});

export const createTrie = () => ({
  root: createTrieNode('*')
});

export function* trieInsert(trie, word) {
  const workingTrie = clone(trie);
  let node = workingTrie.root;
  let step = 0;
  const visitedIds = [node.id];

  yield { trie: clone(workingTrie), currentNodeId: node.id, visitedNodeIds: [...visitedIds], operation: `Start inserting "${word}"`, step, completed: false };
  step++;

  for (const char of word.toLowerCase()) {
    if (!node.children[char]) {
      node.children[char] = createTrieNode(char);
      yield { trie: clone(workingTrie), currentNodeId: node.id, visitedNodeIds: [...visitedIds], operation: `Create edge for "${char}"`, step, completed: false };
      step++;
    }
    node = node.children[char];
    visitedIds.push(node.id);
    yield { trie: clone(workingTrie), currentNodeId: node.id, visitedNodeIds: [...visitedIds], operation: `Move to "${char}"`, step, completed: false };
    step++;
  }

  node.terminal = true;
  yield { trie: clone(workingTrie), currentNodeId: node.id, visitedNodeIds: [...visitedIds], operation: `Mark "${word}" as a complete word`, step, completed: true };
}

export function* trieSearch(trie, word, mode = 'word') {
  let node = trie.root;
  let step = 0;
  const visitedIds = [node.id];

  yield { trie: clone(trie), currentNodeId: node.id, visitedNodeIds: [...visitedIds], operation: `Start ${mode === 'prefix' ? 'prefix' : 'word'} search for "${word}"`, step, completed: false };
  step++;

  for (const char of word.toLowerCase()) {
    if (!node.children[char]) {
      yield { trie: clone(trie), currentNodeId: node.id, visitedNodeIds: [...visitedIds], operation: `Missing "${char}", so "${word}" is not present`, step, completed: true };
      return;
    }
    node = node.children[char];
    visitedIds.push(node.id);
    yield { trie: clone(trie), currentNodeId: node.id, visitedNodeIds: [...visitedIds], operation: `Follow "${char}"`, step, completed: false };
    step++;
  }

  const success = mode === 'prefix' ? true : node.terminal;
  yield {
    trie: clone(trie),
    currentNodeId: node.id,
    visitedNodeIds: [...visitedIds],
    operation: success ? `"${word}" ${mode === 'prefix' ? 'is a valid prefix' : 'exists in the trie'}` : `"${word}" is only a prefix, not a full word`,
    step,
    completed: true
  };
}

export const advancedPseudocode = {
  avl: {
    javascript: [
      'function insertAVL(node, value) {',
      '  if (!node) return new Node(value);',
      '  if (value < node.value) node.left = insertAVL(node.left, value);',
      '  else if (value > node.value) node.right = insertAVL(node.right, value);',
      '  updateHeight(node);',
      '  const balance = height(node.left) - height(node.right);',
      '  if (balance > 1 || balance < -1) rotateToRebalance(node);',
      '  return node;',
      '}'
    ],
    python: [
      'def insert_avl(node, value):',
      '    if node is None: return Node(value)',
      '    if value < node.value: node.left = insert_avl(node.left, value)',
      '    elif value > node.value: node.right = insert_avl(node.right, value)',
      '    update_height(node)',
      '    balance = height(node.left) - height(node.right)',
      '    if abs(balance) > 1: rebalance(node)',
      '    return node'
    ]
  },
  heap: {
    javascript: [
      'function insertHeap(heap, value) {',
      '  heap.push(value);',
      '  let index = heap.length - 1;',
      '  while (index > 0) {',
      '    const parent = Math.floor((index - 1) / 2);',
      '    if (heap[parent] >= heap[index]) break;',
      '    swap(heap[parent], heap[index]);',
      '    index = parent;',
      '  }',
      '}'
    ],
    python: [
      'def insert_heap(heap, value):',
      '    heap.append(value)',
      '    index = len(heap) - 1',
      '    while index > 0:',
      '        parent = (index - 1) // 2',
      '        if heap[parent] >= heap[index]:',
      '            break',
      '        heap[parent], heap[index] = heap[index], heap[parent]',
      '        index = parent'
    ]
  },
  trie: {
    javascript: [
      'function insertTrie(root, word) {',
      '  let node = root;',
      '  for (const char of word) {',
      '    if (!node.children[char]) node.children[char] = new TrieNode(char);',
      '    node = node.children[char];',
      '  }',
      '  node.terminal = true;',
      '}'
    ],
    python: [
      'def insert_trie(root, word):',
      '    node = root',
      '    for char in word:',
      '        if char not in node.children:',
      '            node.children[char] = TrieNode(char)',
      '        node = node.children[char]',
      '    node.terminal = True'
    ]
  },
  traversal: {
    javascript: [
      'function traverse(node) {',
      '  if (!node) return;',
      '  traverse(node.left);',
      '  visit(node);',
      '  traverse(node.right);',
      '}'
    ],
    python: [
      'def traverse(node):',
      '    if node is None:',
      '        return',
      '    traverse(node.left)',
      '    visit(node)',
      '    traverse(node.right)'
    ]
  }
};
