class BSTNode {
  constructor(value, id) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.id = id || Math.random().toString(36).slice(2, 11);
  }
}

const cloneTree = (tree) => JSON.parse(JSON.stringify(tree));

export const insert = function* (tree, value) {
  let currentNode = tree.root;
  let parent = null;
  const visitedNodes = [];
  let step = 0;

  yield {
    tree: cloneTree(tree),
    currentNode: null,
    visitedNodes: [...visitedNodes],
    operation: `Starting insertion of ${value}`,
    step: step++
  };

  while (currentNode) {
    visitedNodes.push({ ...currentNode });

    yield {
      tree: cloneTree(tree),
      currentNode: { ...currentNode },
      visitedNodes: [...visitedNodes],
      operation: `Compare ${value} with ${currentNode.value}`,
      step: step++
    };

    parent = currentNode;
    if (value < currentNode.value) {
      currentNode = currentNode.left;
      yield {
        tree: cloneTree(tree),
        currentNode: currentNode ? { ...currentNode } : null,
        visitedNodes: [...visitedNodes],
        operation: `${value} is smaller, move to the left subtree`,
        step: step++
      };
    } else if (value > currentNode.value) {
      currentNode = currentNode.right;
      yield {
        tree: cloneTree(tree),
        currentNode: currentNode ? { ...currentNode } : null,
        visitedNodes: [...visitedNodes],
        operation: `${value} is larger, move to the right subtree`,
        step: step++
      };
    } else {
      yield {
        tree: cloneTree(tree),
        currentNode: { ...currentNode },
        visitedNodes: [...visitedNodes],
        operation: `${value} already exists, so the BST stays unchanged`,
        step: step++,
        completed: true
      };
      return;
    }
  }

  const newNode = new BSTNode(value);
  if (!parent) {
    tree.root = newNode;
    yield {
      tree: cloneTree(tree),
      currentNode: { ...newNode },
      visitedNodes: [...visitedNodes],
      operation: `Inserted ${value} as the root node`,
      step: step++
    };
  } else if (value < parent.value) {
    parent.left = newNode;
    yield {
      tree: cloneTree(tree),
      currentNode: { ...newNode },
      visitedNodes: [...visitedNodes],
      operation: `Inserted ${value} as the left child of ${parent.value}`,
      step: step++
    };
  } else {
    parent.right = newNode;
    yield {
      tree: cloneTree(tree),
      currentNode: { ...newNode },
      visitedNodes: [...visitedNodes],
      operation: `Inserted ${value} as the right child of ${parent.value}`,
      step: step++
    };
  }

  yield {
    tree: cloneTree(tree),
    currentNode: null,
    visitedNodes: [...visitedNodes],
    operation: `Insertion completed for ${value}`,
    step: step++,
    completed: true
  };
};

export const search = function* (tree, value) {
  let currentNode = tree.root;
  const visitedNodes = [];
  let step = 0;

  yield {
    tree: cloneTree(tree),
    currentNode: null,
    visitedNodes: [],
    operation: `Starting search for ${value}`,
    step: step++
  };

  while (currentNode) {
    visitedNodes.push({ ...currentNode });

    yield {
      tree: cloneTree(tree),
      currentNode: { ...currentNode },
      visitedNodes: [...visitedNodes],
      operation: `Compare ${value} with ${currentNode.value}`,
      step: step++
    };

    if (value === currentNode.value) {
      yield {
        tree: cloneTree(tree),
        currentNode: { ...currentNode },
        visitedNodes: [...visitedNodes],
        operation: `Found ${value} in the tree`,
        step: step++,
        completed: true,
        found: true
      };
      return;
    }

    if (value < currentNode.value) {
      currentNode = currentNode.left;
      yield {
        tree: cloneTree(tree),
        currentNode: currentNode ? { ...currentNode } : null,
        visitedNodes: [...visitedNodes],
        operation: `${value} is smaller, continue left`,
        step: step++
      };
    } else {
      currentNode = currentNode.right;
      yield {
        tree: cloneTree(tree),
        currentNode: currentNode ? { ...currentNode } : null,
        visitedNodes: [...visitedNodes],
        operation: `${value} is larger, continue right`,
        step: step++
      };
    }
  }

  yield {
    tree: cloneTree(tree),
    currentNode: null,
    visitedNodes: [...visitedNodes],
    operation: `${value} is not present in the BST`,
    step: step++,
    completed: true,
    found: false
  };
};

export const traverse = function* (tree, type = 'inorder') {
  const visitedNodes = [];
  let step = 0;

  yield {
    tree: cloneTree(tree),
    currentNode: null,
    visitedNodes: [],
    operation: `Starting ${type} traversal`,
    step: step++
  };

  if (!tree.root) {
    yield {
      tree: cloneTree(tree),
      currentNode: null,
      visitedNodes: [],
      operation: 'Tree is empty',
      step: step++,
      completed: true
    };
    return;
  }

  const visitNode = function* (node, traversalType) {
    if (!node) {
      return;
    }

    if (traversalType === 'preorder') {
      visitedNodes.push({ ...node });
      yield {
        tree: cloneTree(tree),
        currentNode: { ...node },
        visitedNodes: [...visitedNodes],
        operation: `Visit ${node.value} in pre-order`,
        step: step++
      };
    }

    yield* visitNode(node.left, traversalType);

    if (traversalType === 'inorder') {
      visitedNodes.push({ ...node });
      yield {
        tree: cloneTree(tree),
        currentNode: { ...node },
        visitedNodes: [...visitedNodes],
        operation: `Visit ${node.value} in in-order`,
        step: step++
      };
    }

    yield* visitNode(node.right, traversalType);

    if (traversalType === 'postorder') {
      visitedNodes.push({ ...node });
      yield {
        tree: cloneTree(tree),
        currentNode: { ...node },
        visitedNodes: [...visitedNodes],
        operation: `Visit ${node.value} in post-order`,
        step: step++
      };
    }
  };

  yield* visitNode(tree.root, type);

  yield {
    tree: cloneTree(tree),
    currentNode: null,
    visitedNodes: [...visitedNodes],
    operation: `${type} traversal completed: ${visitedNodes.map((node) => node.value).join(' -> ')}`,
    step: step++,
    completed: true
  };
};

export const deleteNode = function* (tree, value) {
  yield {
    tree: cloneTree(tree),
    currentNode: null,
    visitedNodes: [],
    operation: `Deletion for ${value} is not implemented yet`,
    step: 0,
    completed: true
  };
};

export const pseudocode = {
  javascript: [
    "function insert(root, value) {",
    "  if (root === null) return new Node(value);",
    "  if (value < root.value) root.left = insert(root.left, value);",
    "  else if (value > root.value) root.right = insert(root.right, value);",
    "  return root;",
    "}",
    "",
    "function search(root, value) {",
    "  if (root === null) return false;",
    "  if (root.value === value) return true;",
    "  if (value < root.value) return search(root.left, value);",
    "  return search(root.right, value);",
    "}",
    "",
    "function inorder(root) {",
    "  if (root !== null) {",
    "    inorder(root.left);",
    "    visit(root);",
    "    inorder(root.right);",
    "  }",
    "}"
  ],
  python: [
    "def insert(root, value):",
    "    if root is None: return Node(value)",
    "    if value < root.value: root.left = insert(root.left, value)",
    "    elif value > root.value: root.right = insert(root.right, value)",
    "    return root",
    "",
    "def search(root, value):",
    "    if root is None: return False",
    "    if root.value == value: return True",
    "    if value < root.value: return search(root.left, value)",
    "    return search(root.right, value)"
  ]
};

export const getTreeInfo = (tree) => {
  const countNodes = (node) => {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  const getHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
  };

  return {
    totalNodes: countNodes(tree.root),
    height: getHeight(tree.root),
    isEmpty: !tree.root
  };
};
