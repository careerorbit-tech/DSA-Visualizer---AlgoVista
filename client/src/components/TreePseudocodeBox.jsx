// client/src/components/TreePseudocodeBox.jsx
import React from 'react';
import './PseudocodeBox.css';

const TreePseudocodeBox = ({ algorithm, currentStep, currentOperation, traversalType }) => {
  if (!algorithm || !algorithm.pseudocode) return null;

  const getTreePseudocode = () => {
    if (currentOperation && currentOperation.includes('traversal') && traversalType && algorithm.pseudocode.traversal) {
      return algorithm.pseudocode.traversal[traversalType];
    }
    return algorithm.pseudocode.javascript;
  };

  const displayPseudocode = getTreePseudocode();
  const isTraversalExplanation = currentOperation && currentOperation.includes('traversal');

  // Tree-specific step mapping
  const getStepMapping = () => {
    const mappings = {
      // BST Operations
      insert: {
        0: [8],    // function insert
        1: [9],    // if (root === null)
        2: [10],   // if (value < root.value)
        3: [11,12], // root.left = insert
        4: [13,14], // root.right = insert
        5: [15]    // return root
      },
      search: {
        0: [17],   // function search
        1: [18],   // if (root === null)
        2: [19],   // if (root.value === value)
        3: [20],   // if (value < root.value)
        4: [21],   // return search(left)
        5: [22]    // return search(right)
      },
      inorder: {
        0: [24,25], // function inorder + if
        1: [26],    // inorder(left)
        2: [27],    // console.log (visit)
        3: [28],    // inorder(right)
        4: [25]     // completion
      },
      preorder: {
        0: [30,31], // function preorder + if
        1: [32],    // console.log (visit)
        2: [33],    // preorder(left)
        3: [34],    // preorder(right)
        4: [31]     // completion
      },
      postorder: {
        0: [36,37], // function postorder + if
        1: [38],    // postorder(left)
        2: [39],    // postorder(right)
        3: [40],    // console.log (visit)
        4: [37]     // completion
      }
    };

    if (currentOperation.includes('insert')) return mappings.insert;
    if (currentOperation.includes('search')) return mappings.search;
    if (traversalType) return mappings[traversalType];
    return {};
  };

  const stepMapping = getStepMapping();
  const linesToHighlight = stepMapping[currentStep] || [];

  return (
    <div className="pseudocode-box tree-pseudocode">
      <div className="pseudocode-header">
        <h3>Tree Algorithm</h3>
        <span className="language-badge">JS</span>
        {traversalType && (
          <span className="traversal-badge">{traversalType.toUpperCase()}</span>
        )}
        {currentOperation.includes('insert') && (
          <span className="operation-badge insert-badge">INSERT</span>
        )}
        {currentOperation.includes('search') && (
          <span className="operation-badge search-badge">SEARCH</span>
        )}
      </div>
      <div className="pseudocode-content">
        {displayPseudocode.map((line, index) => (
          <div
            key={index}
            className={`pseudocode-line ${
              !isTraversalExplanation && linesToHighlight.includes(index) ? 'highlighted' : ''
            }`}
          >
            {!isTraversalExplanation && <span className="line-number">{index + 1}</span>}
            <span className="line-content">{line}</span>
            {!isTraversalExplanation && linesToHighlight.includes(index) && (
              <div className="execution-pointer">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreePseudocodeBox;