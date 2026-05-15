import React from 'react';
import { Link } from 'react-router-dom';
import './Sorting.css';

const searchingAlgorithms = [
  { name: 'Linear Search', path: 'linearSearch', complexity: 'O(n)', family: 'Sequential' },
  { name: 'Binary Search', path: 'binarySearch', complexity: 'O(log n)', family: 'Sorted array' },
  { name: 'Jump Search', path: 'jumpSearch', complexity: 'O(sqrt(n))', family: 'Block search' },
  { name: 'Interpolation Search', path: 'interpolationSearch', complexity: 'O(log log n)', family: 'Estimated probe' },
  { name: 'Exponential Search', path: 'exponentialSearch', complexity: 'O(log n)', family: 'Range expansion' },
];

const Searching = () => {
  return (
    <div className="sorting-page">
      <h1>Searching Algorithms</h1>
      <p>Compare direct scans, logarithmic searches, and adaptive range-growth strategies on clean interactive datasets.</p>

      <div className="algorithm-grid">
        {searchingAlgorithms.map((algo) => (
          <Link
            key={algo.path}
            to={`/algorithm/searching/${algo.path}`}
            className="algorithm-card"
          >
            <h3>{algo.name}</h3>
            <div className="algorithm-tag">{algo.family}</div>
            <p>Time Complexity: {algo.complexity}</p>
            <span className="view-button">Open Visualization</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Searching;
