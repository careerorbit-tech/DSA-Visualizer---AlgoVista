// client/src/pages/Trees.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Trees.css';

const Trees = () => {
  const treeAlgorithms = [
    { name: 'Binary Search Tree', path: 'bst', complexity: 'O(h)' },
    { name: 'AVL Tree', path: 'avl', complexity: 'O(log n)' },
    { name: 'Heap', path: 'heap', complexity: 'O(log n)' },
    { name: 'Trie', path: 'trie', complexity: 'O(L)' },
    { name: 'Binary Tree Traversal', path: 'traversal', complexity: 'O(n)' },
  ];

  return (
    <div className="trees-page">
      <h1>Tree Data Structures</h1>
      <p>Select a tree data structure to visualize:</p>
      
      <div className="algorithm-grid">
        {treeAlgorithms.map((algo) => (
          <Link 
            key={algo.path} 
            to={`/algorithm/trees/${algo.path}`}
            className="algorithm-card"
          >
            <h3>{algo.name}</h3>
            <p>Time Complexity: {algo.complexity}</p>
            <span className="view-button">Open Live Visualization</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trees;
