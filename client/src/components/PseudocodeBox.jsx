// client/src/components/PseudocodeBox.jsx (original for sorting/searching)
import React from 'react';
import './PseudocodeBox.css';

const PseudocodeBox = ({ algorithm, currentStep, language = 'javascript', algorithmName }) => {
  if (!algorithm || !algorithm.pseudocode) return null;
  
  const pseudocode = algorithm.pseudocode[language] || algorithm.pseudocode.javascript;
  
  // Original mappings for sorting/searching algorithms
  const getStepMapping = () => {
    const mappings = {
     bubbleSort: {
        javascript: {
          0: [0],   // function declaration
          1: [1],   // n = arr.length
          2: [2],   // outer loop start
          3: [3],   // inner loop start
          4: [4],   // if condition
          5: [4,5,6], // if condition true + swap
          6: [4,5,6], // after swap
          7: [4],   // if condition false
          8: [3],   // inner loop continue
          9: [2],   // outer loop continue
          10: [11]  // return
        },
        python: {
          0: [0],   // def
          1: [1],   // n = len(arr)
          2: [2],   // outer loop
          3: [3],   // inner loop
          4: [4],   // if condition
          5: [4,5], // if condition true + swap
          6: [4,5], // after swap
          7: [4],   // if condition false
          8: [3],   // inner loop continue
          9: [2],   // outer loop continue
          10: [7]   // return
        },
         cpp: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [4,5,6],
          6: [4,5,6],
          7: [4],
          8: [3],
          9: [2],
          10: [11]
        },
         java: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [4,5,6],
          6: [4,5,6],
          7: [4],
          8: [3],
          9: [2],
          10: [11]
        },
      },
      linearSearch: {
        javascript: {
          0: [0],   // function declaration
          1: [1],   // for loop initialization
          2: [1],   // loop execution
          3: [2],   // if condition
          4: [2,3], // if condition true
          5: [3],   // return index
          6: [1],   // loop increment
          7: [5]    // return -1
        },
        python: {
          0: [0],   // def
          1: [1],   // for loop
          2: [1],   // loop execution
          3: [2],   // if condition
          4: [2,3], // if condition true
          5: [3],   // return index
          6: [1],   // loop increment
          7: [4]    // return -1
        },
        cpp: {      // same as JS
          0: [0],
          1: [1],
          2: [1],
          3: [2],
          4: [2,3],
          5: [3],
          6: [1],
          7: [6]
        },
        java: {     // same as JS
          0: [0],
          1: [1],
          2: [1],
          3: [2],
          4: [2,3],
          5: [3],
          6: [1],
          7: [6]
        }   
      },
      binarySearch: {
        javascript: {
          0: [0],   // function declaration
          1: [1],   // initialize left, right
          2: [2],   // while loop
          3: [3],   // calculate mid
          4: [4],   // if arr[mid] === target
          5: [4,5], // return mid
          6: [6],   // if arr[mid] < target
          7: [6,7], // left = mid + 1
          8: [8],   // else
          9: [8,9], // right = mid - 1
          10: [11]  // return -1
        },
        python: {
          0: [0],   // def
          1: [1],   // left/right initialization
          2: [2],   // while loop
          3: [3],   // mid calculation
          4: [4],   // if arr[mid] == target
          5: [5],   // return mid
          6: [6],   // elif arr[mid] < target
          7: [7],   // left = mid + 1
          8: [8],   // else
          9: [9],   // right = mid - 1
          10: [10]  // return -1
        },
        cpp: {
          0: [0],   // function declaration
          1: [1],   // left/right initialization
          2: [2],   // while loop
          3: [3],   // mid calculation
          4: [4],   // if arr[mid] == target
          5: [5],   // return mid
          6: [6],   // else if arr[mid] < target
          7: [7],   // left = mid + 1
          8: [8],   // else
          9: [9],   // right = mid - 1
          10: [11]  // return -1
        },
        java: {
          0: [0],   // function declaration
          1: [1],   // left/right initialization
          2: [2],   // while loop
          3: [3],   // mid calculation
          4: [4],   // if arr[mid] == target
          5: [5],   // return mid
          6: [6],   // else if arr[mid] < target
          7: [7],   // left = mid + 1
          8: [8],   // else
          9: [9],   // right = mid - 1
          10: [12]  // return -1
        }
      },
      quickSort: {
        javascript: {
          0: [0],   // function declaration
          1: [1],   // if (low < high)
          2: [2],   // pi = partition
          3: [3],   // quickSort left
          4: [4],   // quickSort right
          5: [6],   // partition function
          6: [7],   // pivot = arr[high]
          7: [8],   // i = low - 1
          8: [9],   // for loop
          9: [10],  // if (arr[j] < pivot)
          10: [11], // i++
          11: [12], // swap
          12: [15], // swap arr[i+1] and arr[high]
          13: [16]  // return i + 1
        },
        python: {
          0: [0],   // def quick_sort
          1: [1],   // base case
          2: [2],   // partition call
          3: [3],   // recursive quickSort left
          4: [4],   // recursive quickSort right
          5: [6],   // def partition
          6: [7],   // pivot selection
          7: [8],   // i initialization
          8: [9],   // for loop j
          9: [10],  // if arr[j] <= pivot
          10: [11], // swap
          11: [12], // increment i
          12: [14], // final swap
          13: [15]  // return i+1
        },
        cpp: {
          0: [0],   // function quickSort
          1: [1],   // if
          2: [2],   // partition
          3: [3],   // left recursion
          4: [4],   // right recursion
          5: [7],   // partition function
          6: [8],   // pivot
          7: [9],   // i init
          8: [10],  // for loop
          9: [11],  // if
          10: [12], // i++
          11: [13], // swap
          12: [16], // final swap
          13: [17]  // return
        },
        java: {
          0: [0],   // function quickSort
          1: [1],   // if
          2: [2],   // partition
          3: [3],   // left recursion
          4: [4],   // right recursion
          5: [7],   // partition function
          6: [8],   // pivot
          7: [9],   // i init
          8: [10],  // for loop
          9: [11],  // if
          10: [12], // i++
          11: [13], // temp swap start
          12: [14], // swap arr[i]
          13: [15], // swap arr[j]
          14: [18], // final swap start
          15: [19], // arr[i+1]
          16: [20], // arr[high]
          17: [21]  // return
        }
      },
      mergeSort: {
        javascript: {
          0: [0],   // function declaration
          1: [1],   // if (l >= r) return
          2: [2],   // let m = Math.floor((l + r) / 2)
          3: [3],   // mergeSort left
          4: [4],   // mergeSort right
          5: [5],   // merge
          6: [7],   // merge function
          7: [8],   // let n1 = m - l + 1
          8: [9],   // let n2 = r - m
          9: [10],  // create temp arrays
          10: [11], // copy data to L[]
          11: [12], // copy data to R[]
          12: [13], // i = 0, j = 0, k = l
          13: [14], // while (i < n1 && j < n2)
          14: [15], // if (L[i] <= R[j])
          15: [16], // arr[k] = L[i]
          16: [17], // else
          17: [18], // arr[k] = R[j]
          18: [21], // while (i < n1)
          19: [22], // arr[k] = L[i]
          20: [24], // while (j < n2)
          21: [25]  // arr[k] = R[j]
        },
        python: {
          0: [0],   // def merge_sort
          1: [1],   // if len(arr) > 1
          2: [2],   // mid calculation
          3: [3],   // left half
          4: [4],   // right half
          5: [5],   // recursive left
          6: [6],   // recursive right
          7: [7],   // i, j, k init
          8: [8],   // while loop
          9: [9],   // if condition
          10: [10], // arr[k] = L[i]
          11: [11], // i += 1
          12: [12], // else
          13: [13], // arr[k] = R[j]
          14: [14], // j += 1
          15: [15], // k += 1
          16: [16], // while L leftovers
          17: [17], // arr[k] = L[i]
          18: [18], // i++, k++
          19: [19], // while R leftovers
          20: [20], // arr[k] = R[j]
          21: [21]  // j++, k++
        },
        cpp: {
          0: [0],   // function mergeSort
          1: [1],   // base case
          2: [2],   // mid calculation
          3: [3],   // recursive left
          4: [4],   // recursive right
          5: [5],   // merge call
          6: [7],   // function merge
          7: [8],   // n1 calc
          8: [9],   // n2 calc
          9: [10],  // create L, R
          10: [11], // copy L
          11: [12], // copy R
          12: [13], // init i, j, k
          13: [14], // while loop
          14: [15], // if condition
          15: [16], // else condition
          16: [18], // leftover L
          17: [19]  // leftover R
        },
        java: {
          0: [0],   // function mergeSort
          1: [1],   // base case
          2: [2],   // mid calculation
          3: [3],   // recursive left
          4: [4],   // recursive right
          5: [5],   // merge call
          6: [7],   // function merge
          7: [8],   // n1 calc
          8: [9],   // n2 calc
          9: [10],  // create L
          10: [11], // create R
          11: [12], // copy L
          12: [13], // copy R
          13: [14], // init i, j, k
          14: [15], // while loop
          15: [16], // if condition
          16: [17], // else condition
          17: [19], // leftover L
          18: [20]  // leftover R
        }
      },
      selectionSort: {
        javascript: {
          0: [0],       // function declaration
          1: [1],       // n = arr.length
          2: [2],       // outer loop start
          3: [3],       // min_idx = i
          4: [4],       // inner loop start
          5: [5],       // if condition
          6: [5,6],     // update min_idx (if condition true)
          7: [5],       // if condition false
          8: [4],       // inner loop continue
          9: [8],       // swap step
          10: [2],      // outer loop continue
          11: [10]      // return
        },
        python: {
          0: [0],       // def
          1: [1],       // n = len(arr)
          2: [2],       // outer loop
          3: [3],       // min_idx = i
          4: [4],       // inner loop
          5: [5],       // if condition
          6: [5,6],     // update min_idx
          7: [5],       // if false
          8: [4],       // inner loop continue
          9: [7],       // swap step
          10: [2],      // outer loop continue
          11: [9]       // return
        },
        cpp: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [5,6],
          7: [5],
          8: [4],
          9: [8],
          10: [2],
          11: [10]
        },
        java: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [5,6],
          7: [5],
          8: [4],
          9: [8],
          10: [2],
          11: [10]
        }
      },
      insertionSort: {
        javascript: {
          0: [0],       // function declaration
          1: [1],       // n = arr.length
          2: [2],       // outer loop start
          3: [3],       // key = arr[i]
          4: [4],       // j = i - 1
          5: [5],       // while condition check
          6: [6],       // shift arr[j] -> arr[j+1]
          7: [5],       // while condition false
          8: [8],       // insert key at arr[j+1]
          9: [2],       // outer loop continue
          10: [10]      // return
        },
        python: {
          0: [0],       // def
          1: [1],       // n = len(arr)
          2: [2],       // outer loop
          3: [3],       // key = arr[i]
          4: [4],       // j = i - 1
          5: [5],       // while condition
          6: [6],       // shift arr[j] -> arr[j+1]
          7: [5],       // while false
          8: [7],       // insert key
          9: [2],       // outer loop continue
          10: [9]       // return
        },
        cpp: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [6],
          7: [5],
          8: [8],
          9: [2],
          10: [10]
        },
        java: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [6],
          7: [5],
          8: [8],
          9: [2],
          10: [10]
        }
      },
      jumpSearch: {
        javascript: {
          0: [0],    // function declaration
          1: [1],    // n = arr.length
          2: [2],    // step = sqrt(n)
          3: [3],    // prev = 0
          4: [4],    // while block comparison
          5: [5],    // prev = step
          6: [6],    // step += sqrt(n)
          7: [7],    // if prev >= n return -1
          8: [9],    // while linear search
          9: [10],   // prev++
          10: [11],  // if prev == min(step, n) return -1
          11: [13],  // if found return index
          12: [14]   // not found return -1
        },
        python: {
          0: [0],    // def
          1: [1],    // n = len(arr)
          2: [2],    // step = sqrt(n)
          3: [3],    // prev = 0
          4: [4],    // while block
          5: [5],    // prev = step
          6: [6],    // step += sqrt(n)
          7: [7],    // if prev >= n return -1
          8: [8],    // while linear search
          9: [9],    // prev += 1
          10: [10],  // if prev == min(step, n) return -1
          11: [11],  // if found return index
          12: [12]   // not found
        },
        cpp: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [6],
          7: [7],
          8: [9],
          9: [10],
          10: [11],
          11: [13],
          12: [14]
        },
        java: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [6],
          7: [7],
          8: [9],
          9: [10],
          10: [11],
          11: [13],
          12: [14]
        }
      },
      interpolationSearch: { // same as jump search
        javascript: {
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [6],
          7: [7],
          8: [8],
          9: [9],
          10: [10],
          11: [11],
          12: [12]
        },
        python: {
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [6],
          7: [7],
          8: [8],
          9: [9],
          10: [10],
          11: [11],
          12: [12]
        },
        cpp: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [6],
          7: [7],
          8: [8],
          9: [9],
          10: [10],
          11: [11],
          12: [12]
        },
        java: { // same as JS
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [6],
          7: [7],
          8: [8],
          9: [9],
          10: [10],
          11: [11],
          12: [12]
        }
      }
      
    };
    return mappings[algorithmName]?.[language] || mappings[algorithmName]?.javascript || {};
  };

  const stepMapping = getStepMapping();
  const linesToHighlight = stepMapping[currentStep] || (Number.isInteger(currentStep) ? [currentStep] : []);

  return (
    <div className="pseudocode-box sorting-pseudocode">
      <div className="pseudocode-header">
        <h3>Algorithm Pseudocode</h3>
        <span className="language-badge">{language.toUpperCase()}</span>
      </div>
      <div className="pseudocode-content">
        {pseudocode.map((line, index) => (
          <div
            key={index}
            className={`pseudocode-line ${linesToHighlight.includes(index) ? 'highlighted' : ''}`}
          >
            <span className="line-number">{index + 1}</span>
            <span className="line-content">{line}</span>
            {linesToHighlight.includes(index) && <div className="execution-pointer">→</div>}
          </div>
        ))}
      </div>
      <div className="pseudocode-footer">
        <div className="step-info">Step: {currentStep}</div>
      </div>
    </div>
  );
};

export default PseudocodeBox;
