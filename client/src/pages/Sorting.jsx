import React from 'react';
import { Link } from 'react-router-dom';
import './Sorting.css';

const sortingAlgorithms = [
  { name: 'Bubble Sort', path: 'bubbleSort', complexity: 'O(n^2)', family: 'Comparison' },
  { name: 'Selection Sort', path: 'selectionSort', complexity: 'O(n^2)', family: 'Comparison' },
  { name: 'Insertion Sort', path: 'insertionSort', complexity: 'O(n^2)', family: 'Comparison' },
  { name: 'Shell Sort', path: 'shellSort', complexity: 'O(n^1.5)', family: 'Gap-based' },
  { name: 'Merge Sort', path: 'mergeSort', complexity: 'O(n log n)', family: 'Divide and conquer' },
  { name: 'Quick Sort', path: 'quickSort', complexity: 'O(n log n)', family: 'Divide and conquer' },
  { name: 'Counting Sort', path: 'countingSort', complexity: 'O(n + k)', family: 'Non-comparison' },
  { name: 'Radix Sort', path: 'radixSort', complexity: 'O(d(n + b))', family: 'Digit-based' },
];

const Sorting = () => {
  return (
    <div className="sorting-page">
      <h1>Sorting Algorithms</h1>
      <p>Explore classic comparison sorts alongside fast counting and digit-based techniques in a richer visualization library.</p>

      <div className="algorithm-grid">
        {sortingAlgorithms.map((algo) => (
          <Link
            key={algo.path}
            to={`/algorithm/sorting/${algo.path}`}
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

export default Sorting;
