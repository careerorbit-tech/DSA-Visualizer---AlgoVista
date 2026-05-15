import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import VisualizationCanvas from '../components/VisualizationCanvas';
import Controls from '../components/Controls';
import PseudocodeBox from '../components/PseudocodeBox';
import { bubbleSort, pseudocode as bubbleSortPseudocode } from '../algorithms/sorting/bubbleSort';
import { quickSort, pseudocode as quickSortPseudocode } from '../algorithms/sorting/quickSort';
import { mergeSort, pseudocode as mergeSortPseudocode } from '../algorithms/sorting/mergeSort';
import { linearSearch, pseudocode as linearSearchPseudocode } from '../algorithms/searching/linearSearch';
import { binarySearch, pseudocode as binarySearchPseudocode } from '../algorithms/searching/binarySearch';
import { selectionSort, pseudocode as selectionSortPseudocode } from '../algorithms/sorting/selectionSort';
import { insertionSort, pseudocode as insertionSortPseudocode } from '../algorithms/sorting/insertionSort';
import { jumpSearch, pseudocode as jumpSearchPseudocode } from '../algorithms/searching/jumpSearch';
import { interpolationSearch, pseudocode as interpolationSearchPseudocode } from '../algorithms/searching/interpolationSearch';
import { shellSort, pseudocode as shellSortPseudocode } from '../algorithms/sorting/shellSort';
import { countingSort, pseudocode as countingSortPseudocode } from '../algorithms/sorting/countingSort';
import { radixSort, pseudocode as radixSortPseudocode } from '../algorithms/sorting/radixSort';
import { exponentialSearch, pseudocode as exponentialSearchPseudocode } from '../algorithms/searching/exponentialSearch';
import './AlgorithmView.css';

const ALGORITHMS = {
  bubbleSort: {
    name: 'Bubble Sort',
    generator: bubbleSort,
    pseudocode: bubbleSortPseudocode,
    isSearch: false,
    metricLabel: 'Swaps',
    description: 'Bubble Sort repeatedly compares adjacent values and swaps them until the largest items bubble to the end.',
    complexity: { worst: 'O(n^2)', average: 'O(n^2)', best: 'O(n)', space: 'O(1)' }
  },
  quickSort: {
    name: 'Quick Sort',
    generator: quickSort,
    pseudocode: quickSortPseudocode,
    isSearch: false,
    metricLabel: 'Swaps',
    description: 'Quick Sort chooses a pivot, partitions values around it, and recursively sorts the two sides.',
    complexity: { worst: 'O(n^2)', average: 'O(n log n)', best: 'O(n log n)', space: 'O(log n)' }
  },
  mergeSort: {
    name: 'Merge Sort',
    generator: mergeSort,
    pseudocode: mergeSortPseudocode,
    isSearch: false,
    metricLabel: 'Writes',
    description: 'Merge Sort splits the array into halves, sorts them recursively, and merges them back together.',
    complexity: { worst: 'O(n log n)', average: 'O(n log n)', best: 'O(n log n)', space: 'O(n)' }
  },
  shellSort: {
    name: 'Shell Sort',
    generator: shellSort,
    pseudocode: shellSortPseudocode,
    isSearch: false,
    metricLabel: 'Shifts',
    description: 'Shell Sort improves insertion-style movement by comparing elements across shrinking gaps before finishing with a final local pass.',
    complexity: { worst: 'O(n^2)', average: 'O(n^1.5)', best: 'O(n log n)', space: 'O(1)' }
  },
  countingSort: {
    name: 'Counting Sort',
    generator: countingSort,
    pseudocode: countingSortPseudocode,
    isSearch: false,
    metricLabel: 'Writes',
    description: 'Counting Sort counts frequencies instead of comparing pairs, which makes it excellent for bounded non-negative integers.',
    complexity: { worst: 'O(n + k)', average: 'O(n + k)', best: 'O(n + k)', space: 'O(k)' }
  },
  radixSort: {
    name: 'Radix Sort',
    generator: radixSort,
    pseudocode: radixSortPseudocode,
    isSearch: false,
    metricLabel: 'Writes',
    description: 'Radix Sort groups values digit by digit, preserving order at each pass until the full number ordering emerges.',
    complexity: { worst: 'O(d(n + b))', average: 'O(d(n + b))', best: 'O(d(n + b))', space: 'O(n + b)' }
  },
  selectionSort: {
    name: 'Selection Sort',
    generator: selectionSort,
    pseudocode: selectionSortPseudocode,
    isSearch: false,
    metricLabel: 'Swaps',
    description: 'Selection Sort repeatedly finds the smallest remaining item and places it into the next sorted position.',
    complexity: { worst: 'O(n^2)', average: 'O(n^2)', best: 'O(n^2)', space: 'O(1)' }
  },
  insertionSort: {
    name: 'Insertion Sort',
    generator: insertionSort,
    pseudocode: insertionSortPseudocode,
    isSearch: false,
    metricLabel: 'Shifts',
    description: 'Insertion Sort grows a sorted prefix and inserts each new value where it belongs.',
    complexity: { worst: 'O(n^2)', average: 'O(n^2)', best: 'O(n)', space: 'O(1)' }
  },
  linearSearch: {
    name: 'Linear Search',
    generator: linearSearch,
    pseudocode: linearSearchPseudocode,
    isSearch: true,
    requiresSortedArray: false,
    description: 'Linear Search checks elements one by one until the target is found or the array ends.',
    complexity: { worst: 'O(n)', average: 'O(n)', best: 'O(1)', space: 'O(1)' }
  },
  binarySearch: {
    name: 'Binary Search',
    generator: binarySearch,
    pseudocode: binarySearchPseudocode,
    isSearch: true,
    requiresSortedArray: true,
    description: 'Binary Search repeatedly halves the remaining search range in a sorted array.',
    complexity: { worst: 'O(log n)', average: 'O(log n)', best: 'O(1)', space: 'O(1)' }
  },
  jumpSearch: {
    name: 'Jump Search',
    generator: jumpSearch,
    pseudocode: jumpSearchPseudocode,
    isSearch: true,
    requiresSortedArray: true,
    description: 'Jump Search skips forward in blocks, then performs a short linear scan inside the matching block.',
    complexity: { worst: 'O(sqrt(n))', average: 'O(sqrt(n))', best: 'O(1)', space: 'O(1)' }
  },
  interpolationSearch: {
    name: 'Interpolation Search',
    generator: interpolationSearch,
    pseudocode: interpolationSearchPseudocode,
    isSearch: true,
    requiresSortedArray: true,
    description: 'Interpolation Search estimates the target position directly when values are fairly evenly distributed.',
    complexity: { worst: 'O(n)', average: 'O(log log n)', best: 'O(1)', space: 'O(1)' }
  },
  exponentialSearch: {
    name: 'Exponential Search',
    generator: exponentialSearch,
    pseudocode: exponentialSearchPseudocode,
    isSearch: true,
    requiresSortedArray: true,
    description: 'Exponential Search quickly grows a search window and then finishes with binary search inside that range.',
    complexity: { worst: 'O(log n)', average: 'O(log n)', best: 'O(1)', space: 'O(1)' }
  }
};

const createBaseState = (nextArray) => ({
  array: [...nextArray],
  i: -1,
  j: -1,
  comparisons: 0,
  swaps: 0,
  shifts: 0,
  sortedIndices: [],
  pivot: null,
  minIndex: -1,
  currentIndex: -1,
  found: false,
  completed: false,
  currentStep: 0
});

const AlgorithmView = () => {
  const { name } = useParams();
  const currentAlgorithm = ALGORITHMS[name] || ALGORITHMS.bubbleSort;
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [targetValue, setTargetValue] = useState(5);
  const [algorithmState, setAlgorithmState] = useState(createBaseState([]));
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const algorithmRef = useRef(null);
  const intervalRef = useRef(null);

  const generateNewArray = useCallback((size) => {
    let newArray;
    const smallArrays = {
      5: [3, 5, 1, 4, 2],
      6: [4, 1, 6, 2, 5, 3],
      7: [2, 3, 7, 6, 4, 5, 1],
      8: [5, 2, 8, 3, 6, 1, 4, 7]
    };

    if (size <= 15) {
      newArray = smallArrays[size] || Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    } else {
      newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    }

    if (currentAlgorithm.isSearch && currentAlgorithm.requiresSortedArray) {
      newArray = [...newArray].sort((a, b) => a - b);
    }

    setArray(newArray);
    setAlgorithmState(createBaseState(newArray));
    setIsPlaying(false);
    algorithmRef.current = null;
    clearInterval(intervalRef.current);
  }, [currentAlgorithm.isSearch, currentAlgorithm.requiresSortedArray]);

  useEffect(() => {
    generateNewArray(arraySize);
    return () => clearInterval(intervalRef.current);
  }, [name, arraySize, generateNewArray]);

  const stopPlayback = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
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

      setAlgorithmState((previous) => ({
        ...previous,
        ...next.value,
        currentStep: next.value.currentStep || 0
      }));

      if (next.value.completed) {
        stopPlayback();
        algorithmRef.current = null;
      }
    }, delay);
  };

  const startAlgorithm = () => {
    if (!currentAlgorithm.generator) {
      return;
    }

    if (!algorithmRef.current) {
      algorithmRef.current = currentAlgorithm.isSearch
        ? currentAlgorithm.generator([...array], targetValue)
        : currentAlgorithm.generator([...array]);
      setAlgorithmState(createBaseState(array));
    }

    setIsPlaying(true);
    runGenerator(algorithmRef.current, speed);
  };

  const pauseAlgorithm = () => {
    stopPlayback();
  };

  const resetAlgorithm = () => {
    stopPlayback();
    algorithmRef.current = null;
    setAlgorithmState(createBaseState(array));
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (isPlaying && algorithmRef.current) {
      runGenerator(algorithmRef.current, newSpeed);
    }
  };

  const handleArraySizeChange = (newSize) => {
    setArraySize(newSize);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleTargetChange = (newTarget) => {
    setTargetValue(newTarget);
    stopPlayback();
    algorithmRef.current = null;
    setAlgorithmState(createBaseState(array));
  };

  const metricValue = algorithmState.shifts ?? algorithmState.swaps ?? 0;
  const dataNote = currentAlgorithm.isSearch && currentAlgorithm.requiresSortedArray
    ? 'This search uses sorted input because the algorithm depends on ordering.'
    : currentAlgorithm.isSearch
      ? 'This search runs on the exact array shown.'
      : 'Follow how the structure of the array changes at each step.';

  return (
    <div className="algorithm-view">
      <h1>{currentAlgorithm.name} Visualization</h1>
      <div className="algorithm-subtitle">{dataNote}</div>

      <div className="main-container">
        <div className="visualization-container">
          <VisualizationCanvas
            data={algorithmState.array}
            algorithmState={algorithmState}
            comparisons={algorithmState.comparisons}
            swaps={metricValue}
            metricLabel={currentAlgorithm.metricLabel || 'Swaps'}
            isSearch={currentAlgorithm.isSearch}
            targetValue={targetValue}
            algorithmName={name}
          />
        </div>

        <div className="pseudocode-container">
          <PseudocodeBox
            algorithm={{ pseudocode: currentAlgorithm.pseudocode }}
            currentStep={algorithmState.currentStep}
            language={language}
            algorithmName={name}
          />
        </div>
      </div>

      <div className="controls-container">
        <Controls
          onGenerate={() => generateNewArray(arraySize)}
          onStart={startAlgorithm}
          onPause={pauseAlgorithm}
          onReset={resetAlgorithm}
          onSpeedChange={handleSpeedChange}
          onArraySizeChange={handleArraySizeChange}
          onLanguageChange={handleLanguageChange}
          onTargetChange={handleTargetChange}
          isPlaying={isPlaying}
          isCompleted={algorithmState.completed}
          arraySize={arraySize}
          speed={speed}
          language={language}
          isSearch={currentAlgorithm.isSearch}
          targetValue={targetValue}
        />
      </div>

      <div className="info-container">
        <div className="algorithm-info">
          <h3>About {currentAlgorithm.name}</h3>
          <p>{currentAlgorithm.description}</p>
        </div>

        <div className="algorithm-info">
          <div className="complexity">
            <h4>Time Complexity:</h4>
            <ul>
              <li>Worst-case: {currentAlgorithm.complexity.worst}</li>
              <li>Average-case: {currentAlgorithm.complexity.average}</li>
              <li>Best-case: {currentAlgorithm.complexity.best}</li>
            </ul>
            <h4>Space Complexity: {currentAlgorithm.complexity.space}</h4>
            <h4>Category: {currentAlgorithm.isSearch ? 'Searching' : 'Sorting'}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmView;
