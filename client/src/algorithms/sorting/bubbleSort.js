// client/src/algorithms/sorting/bubbleSort.js
export const bubbleSort = function* (arr) {
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  let sortedIndices = [];
  
  // Initial state - show function declaration
  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    swaps,
    sortedIndices: [...sortedIndices],
    pivot: null,
    currentStep: 0
  };
  
  // Show outer loop initialization
  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    swaps,
    sortedIndices: [...sortedIndices],
    pivot: null,
    currentStep: 1
  };
  
  for (let i = 0; i < n - 1; i++) {
    // Show outer loop execution
    yield {
      array: [...arr],
      i: i,
      j: -1,
      comparisons,
      swaps,
      sortedIndices: [...sortedIndices],
      pivot: null,
      currentStep: 2
    };
    
    // Show inner loop initialization
    yield {
      array: [...arr],
      i: i,
      j: -1,
      comparisons,
      swaps,
      sortedIndices: [...sortedIndices],
      pivot: null,
      currentStep: 3
    };
    
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      
      // Show comparison step
      yield {
        array: [...arr],
        i: i,
        j: j,
        comparisons,
        swaps,
        sortedIndices: [...sortedIndices],
        pivot: null,
        currentStep: 4
      };
      
      if (arr[j] > arr[j + 1]) {
        // Show swap condition true
        yield {
          array: [...arr],
          i: i,
          j: j,
          comparisons,
          swaps,
          sortedIndices: [...sortedIndices],
          pivot: null,
          currentStep: 5
        };
        
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        
        // Show after swap
        yield {
          array: [...arr],
          i: i,
          j: j,
          comparisons,
          swaps,
          sortedIndices: [...sortedIndices],
          pivot: null,
          currentStep: 6
        };
      } else {
        // Show swap condition false
        yield {
          array: [...arr],
          i: i,
          j: j,
          comparisons,
          swaps,
          sortedIndices: [...sortedIndices],
          pivot: null,
          currentStep: 7
        };
      }
      
      // Show inner loop increment
      yield {
        array: [...arr],
        i: i,
        j: j,
        comparisons,
        swaps,
        sortedIndices: [...sortedIndices],
        pivot: null,
        currentStep: 8
      };
    }
    
    // Mark element as sorted
    sortedIndices.push(n - i - 1);
    
    // Show outer loop increment
    yield {
      array: [...arr],
      i: i,
      j: -1,
      comparisons,
      swaps,
      sortedIndices: [...sortedIndices],
      pivot: null,
      currentStep: 9
    };
  }
  
  // Mark first element as sorted
  sortedIndices.push(0);
  
  // Final state - show return statement
  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    swaps,
    sortedIndices: Array.from({length: n}, (_, i) => i),
    pivot: null,
    completed: true,
    currentStep: 10
  };
};

export const pseudocode = {
  javascript: [
    "function bubbleSort(arr) {",
    "  let n = arr.length;",
    "  for (let i = 0; i < n-1; i++) {",
    "    for (let j = 0; j < n-i-1; j++) {",
    "      if (arr[j] > arr[j+1]) {",
    "        // Swap elements",
    "        let temp = arr[j];",
    "        arr[j] = arr[j+1];",
    "        arr[j+1] = temp;",
    "      }",
    "    }",
    "  }",
    "  return arr;",
    "}"
  ],
  python: [
    "def bubble_sort(arr):",
    "    n = len(arr)",
    "    for i in range(n-1):",
    "        for j in range(0, n-i-1):",
    "            if arr[j] > arr[j+1]:",
    "                # Swap elements",
    "                arr[j], arr[j+1] = arr[j+1], arr[j]",
    "    return arr"
  ],
  cpp: [
    "void bubbleSort(vector<int>& arr) {",
    "    int n = arr.size();",
    "    for (int i = 0; i < n-1; i++) {",
    "        for (int j = 0; j < n-i-1; j++) {",
    "            if (arr[j] > arr[j+1]) {",
    "                // Swap elements",
    "                int temp = arr[j];",
    "                arr[j] = arr[j+1];",
    "                arr[j+1] = temp;",
    "            }",
    "        }",
    "    }",
    "}"
  ],
  java: [
    "void bubbleSort(int arr[]) {",
    "    int n = arr.length;",
    "    for (int i = 0; i < n-1; i++) {",
    "        for (int j = 0; j < n-i-1; j++) {",
    "            if (arr[j] > arr[j+1]) {",
    "                // Swap elements",
    "                int temp = arr[j];",
    "                arr[j] = arr[j+1];",
    "                arr[j+1] = temp;",
    "            }",
    "        }",
    "    }",
    "}"
  ]
};
