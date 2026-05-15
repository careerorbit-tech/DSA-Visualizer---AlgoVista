// client/src/algorithms/sorting/selectionSort.js
export const selectionSort = function* (arr) {
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  let sortedIndices = [];

  // Initial state - show function declaration
  yield {
    array: [...arr],
    i: -1,
    j: -1,
    minIndex: -1,
    comparisons,
    swaps,
    sortedIndices: [...sortedIndices],
    pivot: null,
    currentStep: 0
  };

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Show outer loop execution
    yield {
      array: [...arr],
      i,
      j: -1,
      minIndex,
      comparisons,
      swaps,
      sortedIndices: [...sortedIndices],
      pivot: null,
      currentStep: 1
    };

    for (let j = i + 1; j < n; j++) {
      comparisons++;

      // Show comparison
      yield {
        array: [...arr],
        i,
        j,
        minIndex,
        comparisons,
        swaps,
        sortedIndices: [...sortedIndices],
        pivot: null,
        currentStep: 2
      };

      if (arr[j] < arr[minIndex]) {
        minIndex = j;

        // Show new minIndex found
        yield {
          array: [...arr],
          i,
          j,
          minIndex,
          comparisons,
          swaps,
          sortedIndices: [...sortedIndices],
          pivot: null,
          currentStep: 3
        };
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      swaps++;

      // Show swap
      yield {
        array: [...arr],
        i,
        j: -1,
        minIndex,
        comparisons,
        swaps,
        sortedIndices: [...sortedIndices],
        pivot: null,
        currentStep: 4
      };
    }

    sortedIndices.push(i);

    // Mark current as sorted
    yield {
      array: [...arr],
      i,
      j: -1,
      minIndex,
      comparisons,
      swaps,
      sortedIndices: [...sortedIndices],
      pivot: null,
      currentStep: 5
    };
  }

  sortedIndices.push(n - 1);

  // Final state
  yield {
    array: [...arr],
    i: -1,
    j: -1,
    minIndex: -1,
    comparisons,
    swaps,
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    pivot: null,
    completed: true,
    currentStep: 6
  };
};

export const pseudocode = {
  javascript: [
    "function selectionSort(arr) {",
    "  let n = arr.length;",
    "  for (let i = 0; i < n-1; i++) {",
    "    let minIndex = i;",
    "    for (let j = i+1; j < n; j++) {",
    "      if (arr[j] < arr[minIndex]) {",
    "        minIndex = j;",
    "      }",
    "    }",
    "    if (minIndex !== i) {",
    "      let temp = arr[i];",
    "      arr[i] = arr[minIndex];",
    "      arr[minIndex] = temp;",
    "    }",
    "  }",
    "  return arr;",
    "}"
  ],
  python: [
    "def selection_sort(arr):",
    "    n = len(arr)",
    "    for i in range(n-1):",
    "        min_index = i",
    "        for j in range(i+1, n):",
    "            if arr[j] < arr[min_index]:",
    "                min_index = j",
    "        if min_index != i:",
    "            arr[i], arr[min_index] = arr[min_index], arr[i]",
    "    return arr"
  ],
  cpp: [
    "void selectionSort(vector<int>& arr) {",
    "    int n = arr.size();",
    "    for (int i = 0; i < n-1; i++) {",
    "        int minIndex = i;",
    "        for (int j = i+1; j < n; j++) {",
    "            if (arr[j] < arr[minIndex]) {",
    "                minIndex = j;",
    "            }",
    "        }",
    "        if (minIndex != i) {",
    "            int temp = arr[i];",
    "            arr[i] = arr[minIndex];",
    "            arr[minIndex] = temp;",
    "        }",
    "    }",
    "}"
  ],
  java: [
    "void selectionSort(int arr[]) {",
    "    int n = arr.length;",
    "    for (int i = 0; i < n-1; i++) {",
    "        int minIndex = i;",
    "        for (int j = i+1; j < n; j++) {",
    "            if (arr[j] < arr[minIndex]) {",
    "                minIndex = j;",
    "            }",
    "        }",
    "        if (minIndex != i) {",
    "            int temp = arr[i];",
    "            arr[i] = arr[minIndex];",
    "            arr[minIndex] = temp;",
    "        }",
    "    }",
    "}"
  ]
};
