import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TreeVisualization from '../components/TreeVisualization';
import TrieVisualization from '../components/TrieVisualization';
import PseudocodeBox from '../components/PseudocodeBox';
import { insert as bstInsert, search as bstSearch, traverse as bstTraverse, pseudocode as bstPseudocode, getTreeInfo } from '../algorithms/trees/bst';
import {
  advancedPseudocode,
  avlInsert,
  avlSearch,
  binaryTraversal,
  createSampleAVLTree,
  createSampleHeap,
  createSampleTrie,
  createTraversalTree,
  heapArrayToTree,
  heapExtractMax,
  heapInsert,
  trieInsert,
  trieSearch
} from '../algorithms/trees/advancedStructures';
import './TreeAlgorithmView.css';

const createBinaryState = (tree, operation = '') => ({
  tree,
  currentNode: null,
  visitedNodes: [],
  operation,
  step: 0,
  completed: false
});

const createTrieState = (trie, operation = '') => ({
  trie,
  currentNodeId: trie.root.id,
  visitedNodeIds: [],
  operation,
  step: 0,
  completed: false
});

const createHeapState = (heap, operation = '') => ({
  heap,
  tree: heapArrayToTree(heap),
  currentNode: null,
  visitedNodes: [],
  operation,
  step: 0,
  completed: false
});

const TREE_CONFIG = {
  bst: {
    label: 'Binary Search Tree',
    pseudocode: bstPseudocode,
    description: 'A BST keeps values ordered so search, insert, and traversal follow a predictable path.',
    mode: 'binary'
  },
  avl: {
    label: 'AVL Tree',
    pseudocode: advancedPseudocode.avl,
    description: 'An AVL tree is a self-balancing BST that rotates whenever the height difference grows too large.',
    mode: 'binary'
  },
  heap: {
    label: 'Binary Heap',
    pseudocode: advancedPseudocode.heap,
    description: 'A max-heap maintains the largest value at the root and restores order through bubble-up and sift-down steps.',
    mode: 'heap'
  },
  trie: {
    label: 'Trie',
    pseudocode: advancedPseudocode.trie,
    description: 'A trie stores characters along edges so whole words and prefixes share the same path.',
    mode: 'trie'
  },
  traversal: {
    label: 'Binary Tree Traversal',
    pseudocode: advancedPseudocode.traversal,
    description: 'Traversal explores the same binary tree in different visit orders so you can compare how sequence changes.',
    mode: 'binary'
  }
};

const TreeAlgorithmView = () => {
  const { name } = useParams();
  const currentConfig = TREE_CONFIG[name] || TREE_CONFIG.bst;
  const [bstTree, setBstTree] = useState({ root: null });
  const [avlTree, setAvlTree] = useState(createSampleAVLTree());
  const [traversalTree, setTraversalTree] = useState(createTraversalTree());
  const [heap, setHeap] = useState(createSampleHeap());
  const [trie, setTrie] = useState(createSampleTrie());
  const [numberInput, setNumberInput] = useState('');
  const [textInput, setTextInput] = useState('cat');
  const [language, setLanguage] = useState('javascript');
  const [speed, setSpeed] = useState(900);
  const [isPlaying, setIsPlaying] = useState(false);
  const [operation, setOperation] = useState('insert');
  const [traversalType, setTraversalType] = useState('inorder');
  const [visualState, setVisualState] = useState(createBinaryState({ root: null }));
  const algorithmRef = useRef(null);
  const intervalRef = useRef(null);
  const bstRef = useRef(bstTree);
  const avlRef = useRef(avlTree);
  const traversalRef = useRef(traversalTree);
  const heapRef = useRef(heap);
  const trieRef = useRef(trie);

  useEffect(() => { bstRef.current = bstTree; }, [bstTree]);
  useEffect(() => { avlRef.current = avlTree; }, [avlTree]);
  useEffect(() => { traversalRef.current = traversalTree; }, [traversalTree]);
  useEffect(() => { heapRef.current = heap; }, [heap]);
  useEffect(() => { trieRef.current = trie; }, [trie]);

  useEffect(() => {
    stopPlayback();
    algorithmRef.current = null;

    if (name === 'trie') {
      setVisualState(createTrieState(trieRef.current));
    } else if (name === 'heap') {
      setVisualState(createHeapState(heapRef.current));
    } else {
      const nextBinaryTree = name === 'bst' ? bstRef.current : name === 'avl' ? avlRef.current : traversalRef.current;
      setVisualState(createBinaryState(nextBinaryTree));
    }
    return () => clearInterval(intervalRef.current);
  }, [name]);

  const stopPlayback = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const currentBinaryTree = name === 'bst' ? bstTree : name === 'avl' ? avlTree : traversalTree;

  const resetAlgorithm = () => {
    stopPlayback();
    algorithmRef.current = null;

    if (name === 'trie') {
      setVisualState(createTrieState(trie));
    } else if (name === 'heap') {
      setVisualState(createHeapState(heap));
    } else {
      setVisualState(createBinaryState(currentBinaryTree));
    }
  };

  const applyStateToStructure = (nextState) => {
    setVisualState(nextState);
    if (name === 'bst' && nextState.tree) setBstTree(nextState.tree);
    if (name === 'avl' && nextState.tree) setAvlTree(nextState.tree);
    if (name === 'traversal' && nextState.tree) setTraversalTree(nextState.tree);
    if (name === 'heap' && nextState.heap) setHeap(nextState.heap);
    if (name === 'trie' && nextState.trie) setTrie(nextState.trie);
  };

  const runGenerator = (generator, delay) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = generator.next();
      if (next.done) {
        stopPlayback();
        algorithmRef.current = null;
        return;
      }
      applyStateToStructure(next.value);
      if (next.value.completed) {
        stopPlayback();
        algorithmRef.current = null;
      }
    }, delay);
  };

  const startAlgorithm = () => {
    let generator;
    const numericValue = Number.parseInt(numberInput, 10);

    if (name === 'bst') {
      generator = operation === 'insert'
        ? bstInsert({ ...bstTree }, numericValue)
        : operation === 'search'
          ? bstSearch({ ...bstTree }, numericValue)
          : bstTraverse({ ...bstTree }, traversalType);
    } else if (name === 'avl') {
      generator = operation === 'insert'
        ? avlInsert({ ...avlTree }, numericValue)
        : operation === 'search'
          ? avlSearch({ ...avlTree }, numericValue)
          : binaryTraversal({ ...avlTree }, traversalType, 'AVL tree');
    } else if (name === 'heap') {
      generator = operation === 'insert'
        ? heapInsert(heap, numericValue)
        : heapExtractMax(heap);
    } else if (name === 'trie') {
      generator = operation === 'insert'
        ? trieInsert(trie, textInput.trim())
        : trieSearch(trie, textInput.trim(), operation === 'prefix' ? 'prefix' : 'word');
    } else {
      generator = binaryTraversal({ ...traversalTree }, traversalType, 'binary tree');
    }

    algorithmRef.current = generator;
    setIsPlaying(true);
    runGenerator(generator, speed);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
    if (isPlaying && algorithmRef.current) {
      runGenerator(algorithmRef.current, value);
    }
  };

  const generateStructure = () => {
    stopPlayback();
    algorithmRef.current = null;

    if (name === 'bst') {
      setBstTree({ root: null });
      setVisualState(createBinaryState({ root: null }, 'Cleared the BST'));
      return;
    }

    if (name === 'avl') {
      const sample = createSampleAVLTree();
      setAvlTree(sample);
      setVisualState(createBinaryState(sample, 'Loaded a balanced AVL sample'));
      return;
    }

    if (name === 'heap') {
      const sample = createSampleHeap();
      setHeap(sample);
      setVisualState(createHeapState(sample, 'Loaded a sample max-heap'));
      return;
    }

    if (name === 'trie') {
      const sample = createSampleTrie();
      setTrie(sample);
      setVisualState(createTrieState(sample, 'Loaded a sample trie'));
      return;
    }

    const sample = createTraversalTree();
    setTraversalTree(sample);
    setVisualState(createBinaryState(sample, 'Loaded a sample binary tree'));
  };

  const treeInfo = currentConfig.mode === 'trie'
    ? null
    : currentConfig.mode === 'heap'
      ? { totalNodes: heap.length, height: heap.length ? Math.floor(Math.log2(heap.length)) + 1 : 0, isEmpty: heap.length === 0 }
      : getTreeInfo(currentBinaryTree);

  const renderVisualization = () => {
    if (currentConfig.mode === 'trie') {
      return <TrieVisualization trieState={visualState} />;
    }

    if (currentConfig.mode === 'heap') {
      return (
        <>
          <TreeVisualization
            treeData={visualState.tree}
            currentOperation={visualState.operation}
            currentNode={visualState.currentNode}
            visitedNodes={visualState.visitedNodes}
          />
          <div className="heap-array-panel">
            <strong>Heap Array:</strong> {heap.length ? heap.join(', ') : 'empty'}
          </div>
        </>
      );
    }

    return (
      <TreeVisualization
        treeData={visualState.tree}
        currentOperation={visualState.operation}
        currentNode={visualState.currentNode}
        visitedNodes={visualState.visitedNodes}
      />
    );
  };

  const renderControls = () => {
    if (name === 'trie') {
      return (
        <>
          <div className="control-group">
            <label htmlFor="trieOperation">Operation:</label>
            <select id="trieOperation" value={operation} onChange={(e) => setOperation(e.target.value)} disabled={isPlaying}>
              <option value="insert">Insert Word</option>
              <option value="search">Search Word</option>
              <option value="prefix">Prefix Search</option>
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="trieWord">Word:</label>
            <input id="trieWord" type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} disabled={isPlaying} />
          </div>
        </>
      );
    }

    if (name === 'heap') {
      return (
        <>
          <div className="control-group">
            <label htmlFor="heapOperation">Operation:</label>
            <select id="heapOperation" value={operation} onChange={(e) => setOperation(e.target.value)} disabled={isPlaying}>
              <option value="insert">Insert</option>
              <option value="extract">Extract Max</option>
            </select>
          </div>
          {operation === 'insert' && (
            <div className="control-group">
              <label htmlFor="heapValue">Value:</label>
              <input id="heapValue" type="number" value={numberInput} onChange={(e) => setNumberInput(e.target.value)} disabled={isPlaying} min="1" max="100" />
            </div>
          )}
        </>
      );
    }

    if (name === 'traversal') {
      return (
        <div className="control-group">
          <label htmlFor="treeTraversal">Traversal Type:</label>
          <select id="treeTraversal" value={traversalType} onChange={(e) => setTraversalType(e.target.value)} disabled={isPlaying}>
            <option value="inorder">In-order</option>
            <option value="preorder">Pre-order</option>
            <option value="postorder">Post-order</option>
            <option value="levelorder">Level-order</option>
          </select>
        </div>
      );
    }

    return (
      <>
        <div className="control-group">
          <label htmlFor="treeOperation">Operation:</label>
          <select id="treeOperation" value={operation} onChange={(e) => setOperation(e.target.value)} disabled={isPlaying}>
            <option value="insert">Insert</option>
            <option value="search">Search</option>
            <option value="traverse">Traverse</option>
          </select>
        </div>

        {operation !== 'traverse' && (
          <div className="control-group">
            <label htmlFor="treeValue">Value:</label>
            <input id="treeValue" type="number" value={numberInput} onChange={(e) => setNumberInput(e.target.value)} disabled={isPlaying} min="1" max="100" />
          </div>
        )}

        {operation === 'traverse' && (
          <div className="control-group">
            <label htmlFor="treeTraversalSelect">Traversal Type:</label>
            <select id="treeTraversalSelect" value={traversalType} onChange={(e) => setTraversalType(e.target.value)} disabled={isPlaying}>
              <option value="inorder">In-order</option>
              <option value="preorder">Pre-order</option>
              <option value="postorder">Post-order</option>
              <option value="levelorder">Level-order</option>
            </select>
          </div>
        )}
      </>
    );
  };

  const isStartDisabled =
    isPlaying ||
    ((name === 'bst' || name === 'avl') && operation !== 'traverse' && !numberInput) ||
    (name === 'heap' && operation === 'insert' && !numberInput) ||
    (name === 'trie' && !textInput.trim());

  return (
    <div className="tree-algorithm-view">
      <h1>{currentConfig.label} Visualization</h1>

      <div className="main-container">
        <div className="visualization-container">
          {renderVisualization()}
        </div>

        <div className="pseudocode-container">
          <PseudocodeBox
            algorithm={{ pseudocode: currentConfig.pseudocode }}
            currentStep={visualState.step}
            language={language}
            algorithmName={name}
          />
        </div>
      </div>

      <div className="controls-container">
        <div className="tree-controls">
          {renderControls()}

          <div className="control-group">
            <label htmlFor="treeSpeed">Speed: {speed}ms</label>
            <input id="treeSpeed" type="range" min="100" max="3000" step="100" value={speed} onChange={(e) => handleSpeedChange(Number.parseInt(e.target.value, 10))} />
          </div>

          <div className="control-group">
            <label htmlFor="treeLanguage">Pseudocode Language:</label>
            <select id="treeLanguage" value={language} onChange={(e) => setLanguage(e.target.value)} disabled={isPlaying}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div className="buttons">
            <button onClick={generateStructure} disabled={isPlaying}>
              {name === 'bst' ? 'Clear Tree' : 'Load Sample'}
            </button>
            <button onClick={startAlgorithm} disabled={isStartDisabled}>
              {isPlaying ? 'Running...' : 'Start'}
            </button>
            <button onClick={stopPlayback} disabled={!isPlaying}>Pause</button>
            <button onClick={resetAlgorithm} disabled={isPlaying}>Reset</button>
          </div>
        </div>
      </div>

      <div className="info-container">
        <div className="algorithm-info">
          <h3>About {currentConfig.label}</h3>
          <p>{currentConfig.description}</p>
        </div>

        <div className="algorithm-info">
          <div className="complexity">
            <h4>Current Structure Snapshot</h4>
            <ul>
              {currentConfig.mode === 'trie' ? (
                <>
                  <li>Root initialized: yes</li>
                  <li>Operation mode: word and prefix navigation</li>
                  <li>Status: shared-prefix structure</li>
                </>
              ) : (
                <>
                  <li>Total nodes: {treeInfo.totalNodes}</li>
                  <li>Height: {treeInfo.height}</li>
                  <li>Status: {treeInfo.isEmpty ? 'Empty structure' : 'Active structure'}</li>
                </>
              )}
            </ul>
            {name === 'avl' && <h4>AVL guarantee: balance factor stays between -1 and 1</h4>}
            {name === 'heap' && <h4>Heap rule: every parent remains greater than or equal to its children</h4>}
            {name === 'trie' && <h4>Trie rule: each edge stores one character of a shared prefix</h4>}
            {name === 'traversal' && <h4>Traversal goal: compare the different visit orders on the same tree</h4>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeAlgorithmView;
