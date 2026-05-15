// client/src/algorithms/sorting/quickSort.js
export const quickSort = function* (arr, low = 0, high = arr.length - 1, parentState = { comparisons: 0, swaps: 0 }) {
  let comparisons = parentState.comparisons;
  let swaps = parentState.swaps;
  let sortedIndices = [];
  
  if (low < high) {
    // Partition the array and get the pivot index
    const partitionGenerator = partition(arr, low, high, { comparisons, swaps });
    
    let partitionResult;
    for (partitionResult of partitionGenerator) {
      comparisons = partitionResult.comparisons;
      swaps = partitionResult.swaps;
      yield {
        array: [...arr],
        i: partitionResult.i,
        j: partitionResult.j,
        comparisons,
        swaps,
        sortedIndices: [...sortedIndices],
        pivot: partitionResult.pivot,
        low,
        high,
        currentStep: 3 // Comparison step
      };
    }
    
    const pi = partitionResult.pivot;
    sortedIndices.push(pi);
    
    // Recursively sort elements before and after partition
    const leftGenerator = quickSort(arr, low, pi - 1, { comparisons, swaps });
    for (const state of leftGenerator) {
      yield {
        ...state,
        sortedIndices: [...sortedIndices, ...state.sortedIndices],
        currentStep: state.currentStep || 2
      };
    }
    
    const rightGenerator = quickSort(arr, pi + 1, high, { comparisons, swaps });
    for (const state of rightGenerator) {
      yield {
        ...state,
        sortedIndices: [...sortedIndices, ...state.sortedIndices],
        currentStep: state.currentStep || 2
      };
    }
  }
  
  if (low === 0 && high === arr.length - 1) {
    // Final state
    yield {
      array: [...arr],
      i: -1,
      j: -1,
      comparisons,
      swaps,
      sortedIndices: Array.from({length: arr.length}, (_, i) => i),
      pivot: null,
      completed: true,
      currentStep: 10
    };
  }
};

function* partition(arr, low, high, state) {
  let comparisons = state.comparisons;
  let swaps = state.swaps;
  
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    comparisons++;
    
    yield {
      array: [...arr],
      i: j,
      j: high,
      comparisons,
      swaps,
      sortedIndices: [],
      pivot: high,
      currentStep: 3 // Comparison step
    };
    
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      swaps++;
      
      yield {
        array: [...arr],
        i,
        j,
        comparisons,
        swaps,
        sortedIndices: [],
        pivot: high,
        currentStep: 5 // Swap step
      };
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  swaps++;
  
  yield {
    array: [...arr],
    i: i + 1,
    j: high,
    comparisons,
    swaps,
    sortedIndices: [],
    pivot: i + 1,
    currentStep: 5 // Swap step
  };
}

export const pseudocode = {
  javascript: [
    "function quickSort(arr, low, high) {",
    "  if (low < high) {",
    "    let pi = partition(arr, low, high);",
    "    quickSort(arr, low, pi - 1);",
    "    quickSort(arr, pi + 1, high);",
    "  }",
    "}",
    "function partition(arr, low, high) {",
    "  let pivot = arr[high];",
    "  let i = low - 1;",
    "  for (let j = low; j < high; j++) {",
    "    if (arr[j] < pivot) {",
    "      i++;",
    "      [arr[i], arr[j]] = [arr[j], arr[i]];",
    "    }",
    "  }",
    "  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];",
    "  return i + 1;",
    "}"
  ],
  python: [
    "def quick_sort(arr, low, high):",
    "    if low < high:",
    "        pi = partition(arr, low, high)",
    "        quick_sort(arr, low, pi - 1)",
    "        quick_sort(arr, pi + 1, high)",
    "",
    "def partition(arr, low, high):",
    "    pivot = arr[high]",
    "    i = low - 1",
    "    for j in range(low, high):",
    "        if arr[j] < pivot:",
    "            i += 1",
    "            arr[i], arr[j] = arr[j], arr[i]",
    "    arr[i + 1], arr[high] = arr[high], arr[i + 1]",
    "    return i + 1"
  ],
  cpp: [
    "void quickSort(vector<int>& arr, int low, int high) {", // 0
    "    if (low < high) {",                                 // 1
    "        int pi = partition(arr, low, high);",           // 2
    "        quickSort(arr, low, pi - 1);",                  // 3
    "        quickSort(arr, pi + 1, high);",                 // 4
    "    }",                                                 // 5
    "}",                                                     // 6
    "int partition(vector<int>& arr, int low, int high) {",  // 7
    "    int pivot = arr[high];",                            // 8
    "    int i = low - 1;",                                  // 9
    "    for (int j = low; j < high; j++) {",                // 10
    "        if (arr[j] <= pivot) {",                        // 11
    "            i++;",                                      // 12
    "            swap(arr[i], arr[j]);",                     // 13
    "        }",                                             // 14
    "    }",                                                 // 15
    "    swap(arr[i + 1], arr[high]);",                      // 16
    "    return i + 1;",                                     // 17
    "}"                                                      // 18
  ],
  java: [
    "void quickSort(int arr[], int low, int high) {",        // 0
    "    if (low < high) {",                                 // 1
    "        int pi = partition(arr, low, high);",           // 2
    "        quickSort(arr, low, pi - 1);",                  // 3
    "        quickSort(arr, pi + 1, high);",                 // 4
    "    }",                                                 // 5
    "}",                                                     // 6
    "int partition(int arr[], int low, int high) {",         // 7
    "    int pivot = arr[high];",                            // 8
    "    int i = low - 1;",                                  // 9
    "    for (int j = low; j < high; j++) {",                // 10
    "        if (arr[j] <= pivot) {",                        // 11
    "            i++;",                                      // 12
    "            int temp = arr[i];",                        // 13
    "            arr[i] = arr[j];",                          // 14
    "            arr[j] = temp;",                            // 15
    "        }",                                             // 16
    "    }",                                                 // 17
    "    int temp = arr[i+1];",                              // 18
    "    arr[i+1] = arr[high];",                             // 19
    "    arr[high] = temp;",                                 // 20
    "    return i + 1;",                                     // 21
    "}"                                                      // 22
  ]
};