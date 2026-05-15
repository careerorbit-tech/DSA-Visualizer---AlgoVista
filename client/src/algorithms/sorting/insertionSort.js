// client/src/algorithms/sorting/insertionSort.js
export const insertionSort = function* (arr) {
  let comparisons = 0;
  let shifts = 0;
  const n = arr.length;
  let sortedIndices = [];

  // Initial state - function declaration
  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    shifts,
    sortedIndices: [],
    pivot: null,
    currentStep: 0
  };

  // n = arr.length
  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    shifts,
    sortedIndices: [],
    pivot: null,
    currentStep: 1
  };

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    // Outer loop start
    yield {
      array: [...arr],
      i,
      j,
      comparisons,
      shifts,
      sortedIndices: [...sortedIndices],
      pivot: key,
      currentStep: 2
    };

    // key assignment
    yield {
      array: [...arr],
      i,
      j,
      comparisons,
      shifts,
      sortedIndices: [...sortedIndices],
      pivot: key,
      currentStep: 3
    };

    // j = i-1
    yield {
      array: [...arr],
      i,
      j,
      comparisons,
      shifts,
      sortedIndices: [...sortedIndices],
      pivot: key,
      currentStep: 4
    };

    while (j >= 0 && arr[j] > key) {
      comparisons++;

      // while condition true
      yield {
        array: [...arr],
        i,
        j,
        comparisons,
        shifts,
        sortedIndices: [...sortedIndices],
        pivot: key,
        currentStep: 5
      };

      arr[j + 1] = arr[j];
      shifts++;

      // after shift
      yield {
        array: [...arr],
        i,
        j,
        comparisons,
        shifts,
        sortedIndices: [...sortedIndices],
        pivot: key,
        currentStep: 6
      };

      j--;
    }

    // while condition false
    yield {
      array: [...arr],
      i,
      j,
      comparisons,
      shifts,
      sortedIndices: [...sortedIndices],
      pivot: key,
      currentStep: 7
    };

    arr[j + 1] = key;

    // insert key
    yield {
      array: [...arr],
      i,
      j,
      comparisons,
      shifts,
      sortedIndices: [...sortedIndices],
      pivot: key,
      currentStep: 8
    };

    sortedIndices = Array.from({ length: i + 1 }, (_, idx) => idx);

    // outer loop continue
    yield {
      array: [...arr],
      i,
      j,
      comparisons,
      shifts,
      sortedIndices,
      pivot: null,
      currentStep: 9
    };
  }

  // Final state
  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    shifts,
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    pivot: null,
    completed: true,
    currentStep: 10
  };
};

export const pseudocode = {
  javascript: [
    "function insertionSort(arr) {",        // 0
    "  let n = arr.length;",               // 1
    "  for (let i = 1; i < n; i++) {",     // 2
    "    let key = arr[i];",               // 3
    "    let j = i - 1;",                  // 4
    "    while (j >= 0 && arr[j] > key) {",// 5
    "      arr[j + 1] = arr[j];",          // 6
    "      j = j - 1;",                    // (part of while loop)
    "    }",                               // 7
    "    arr[j + 1] = key;",               // 8
    "  }",                                 // 9
    "  return arr;",                       // 10
    "}"                                    // end
  ],
  python: [
    "def insertion_sort(arr):",            // 0
    "    n = len(arr)",                   // 1
    "    for i in range(1, n):",          // 2
    "        key = arr[i]",               // 3
    "        j = i - 1",                  // 4
    "        while j >= 0 and arr[j] > key:", // 5
    "            arr[j + 1] = arr[j]",    // 6
    "            j -= 1",                 // part of while
    "        arr[j + 1] = key",           // 8
    "    return arr"                      // 9
  ],
  cpp: [
    "void insertionSort(vector<int>& arr) {", // 0
    "    int n = arr.size();",               // 1
    "    for (int i = 1; i < n; i++) {",     // 2
    "        int key = arr[i];",             // 3
    "        int j = i - 1;",                // 4
    "        while (j >= 0 && arr[j] > key) {", // 5
    "            arr[j + 1] = arr[j];",      // 6
    "            j--;",                      // part of while
    "        }",                             // 7
    "        arr[j + 1] = key;",             // 8
    "    }",                                 // 9
    "}"                                      // 10
  ],
  java: [
    "void insertionSort(int arr[]) {",       // 0
    "    int n = arr.length;",              // 1
    "    for (int i = 1; i < n; i++) {",    // 2
    "        int key = arr[i];",            // 3
    "        int j = i - 1;",               // 4
    "        while (j >= 0 && arr[j] > key) {", // 5
    "            arr[j + 1] = arr[j];",     // 6
    "            j--;",                     // part of while
    "        }",                            // 7
    "        arr[j + 1] = key;",            // 8
    "    }",                                // 9
    "}"                                     // 10
  ]
};
