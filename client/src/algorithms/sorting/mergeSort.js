// client/src/algorithms/sorting/mergeSort.js
export const mergeSort = function* (arr, left = 0, right = arr.length - 1, parentState = { comparisons: 0, swaps: 0 }) {
  let comparisons = parentState.comparisons;
  let swaps = parentState.swaps;
  let sortedIndices = [];
  
  if (left >= right) {
    return;
  }
  
  const mid = Math.floor((left + right) / 2);
  
  // Visualize the division
  yield {
    array: [...arr],
    i: left,
    j: right,
    comparisons,
    swaps,
    sortedIndices: [...sortedIndices],
    pivot: mid,
    low: left,
    high: right,
    currentStep: 2 // Division step
  };
  
  // Recursively sort both halves
  const leftGenerator = mergeSort(arr, left, mid, { comparisons, swaps });
  for (const state of leftGenerator) {
    comparisons = state.comparisons;
    swaps = state.swaps;
    yield {
      ...state,
      sortedIndices: [...sortedIndices, ...state.sortedIndices],
      currentStep: state.currentStep || 2
    };
  }
  
  const rightGenerator = mergeSort(arr, mid + 1, right, { comparisons, swaps });
  for (const state of rightGenerator) {
    comparisons = state.comparisons;
    swaps = state.swaps;
    yield {
      ...state,
      sortedIndices: [...sortedIndices, ...state.sortedIndices],
      currentStep: state.currentStep || 2
    };
  }
  
  // Merge the sorted halves
  const mergeGenerator = merge(arr, left, mid, right, { comparisons, swaps });
  for (const state of mergeGenerator) {
    comparisons = state.comparisons;
    swaps = state.swaps;
    yield {
      ...state,
      currentStep: state.currentStep || 4
    };
  }
  
  // Mark this segment as sorted
  for (let i = left; i <= right; i++) {
    sortedIndices.push(i);
  }
  
  if (left === 0 && right === arr.length - 1) {
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

function* merge(arr, left, mid, right, state) {
  let comparisons = state.comparisons;
  let swaps = state.swaps;
  
  const n1 = mid - left + 1;
  const n2 = right - mid;
  
  // Create temp arrays
  const L = new Array(n1);
  const R = new Array(n2);
  
  // Copy data to temp arrays
  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
    swaps++;
    yield {
      array: [...arr],
      i: left + i,
      j: -1,
      comparisons,
      swaps,
      sortedIndices: [],
      pivot: null,
      currentStep: 4 // Copy step
    };
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
    swaps++;
    yield {
      array: [...arr],
      i: mid + 1 + j,
      j: -1,
      comparisons,
      swaps,
      sortedIndices: [],
      pivot: null,
      currentStep: 4 // Copy step
    };
  }
  
  // Merge the temp arrays back
  let i = 0, j = 0, k = left;
  
  while (i < n1 && j < n2) {
    comparisons++;
    
    yield {
      array: [...arr],
      i: left + i,
      j: mid + 1 + j,
      comparisons,
      swaps,
      sortedIndices: [],
      pivot: null,
      currentStep: 3 // Comparison step
    };
    
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    swaps++;
    k++;
    
    yield {
      array: [...arr],
      i: k - 1,
      j: -1,
      comparisons,
      swaps,
      sortedIndices: [],
      pivot: null,
      currentStep: 5 // Merge step
    };
  }
  
  // Copy remaining elements
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
    swaps++;
    
    yield {
      array: [...arr],
      i: k - 1,
      j: -1,
      comparisons,
      swaps,
      sortedIndices: [],
      pivot: null,
      currentStep: 5 // Merge step
    };
  }
  
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
    swaps++;
    
    yield {
      array: [...arr],
      i: k - 1,
      j: -1,
      comparisons,
      swaps,
      sortedIndices: [],
      pivot: null,
      currentStep: 5 // Merge step
    };
  }
}

export const pseudocode = {
  javascript: [
    "function mergeSort(arr, l, r) {",
    "  if (l >= r) return;",
    "  let m = Math.floor((l + r) / 2);",
    "  mergeSort(arr, l, m);",
    "  mergeSort(arr, m + 1, r);",
    "  merge(arr, l, m, r);",
    "}",
    "function merge(arr, l, m, r) {",
    "  let n1 = m - l + 1;",
    "  let n2 = r - m;",
    "  let L = new Array(n1);",
    "  let R = new Array(n2);",
    "  for (let i = 0; i < n1; i++) L[i] = arr[l + i];",
    "  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];",
    "  let i = 0, j = 0, k = l;",
    "  while (i < n1 && j < n2) {",
    "    if (L[i] <= R[j]) {",
    "      arr[k] = L[i];",
    "      i++;",
    "    } else {",
    "      arr[k] = R[j];",
    "      j++;",
    "    }",
    "    k++;",
    "  }",
    "  while (i < n1) { arr[k] = L[i]; i++; k++; }",
    "  while (j < n2) { arr[k] = R[j]; j++; k++; }",
    "}"
  ],

  python: [
    "def merge_sort(arr):",                             // 0
    "    if len(arr) > 1:",                             // 1
    "        mid = len(arr) // 2",                      // 2
    "        L = arr[:mid]",                            // 3
    "        R = arr[mid:]",                            // 4
    "        merge_sort(L)",                            // 5
    "        merge_sort(R)",                            // 6
    "        i = j = k = 0",                            // 7
    "        while i < len(L) and j < len(R):",         // 8
    "            if L[i] <= R[j]:",                     // 9
    "                arr[k] = L[i]",                    // 10
    "                i += 1",                           // 11
    "            else:",                                // 12
    "                arr[k] = R[j]",                    // 13
    "                j += 1",                           // 14
    "            k += 1",                               // 15
    "        while i < len(L):",                        // 16
    "            arr[k] = L[i]",                        // 17
    "            i += 1; k += 1",                       // 18
    "        while j < len(R):",                        // 19
    "            arr[k] = R[j]",                        // 20
    "            j += 1; k += 1"                        // 21
  ],

  cpp: [
    "void mergeSort(vector<int>& arr, int l, int r) {",   // 0
    "    if (l >= r) return;",                            // 1
    "    int m = l + (r - l) / 2;",                       // 2
    "    mergeSort(arr, l, m);",                          // 3
    "    mergeSort(arr, m + 1, r);",                      // 4
    "    merge(arr, l, m, r);",                           // 5
    "}",                                                  // 6
    "void merge(vector<int>& arr, int l, int m, int r) {",// 7
    "    int n1 = m - l + 1;",                            // 8
    "    int n2 = r - m;",                                // 9
    "    vector<int> L(n1), R(n2);",                      // 10
    "    for (int i = 0; i < n1; i++) L[i] = arr[l+i];",  // 11
    "    for (int j = 0; j < n2; j++) R[j] = arr[m+1+j];",// 12
    "    int i = 0, j = 0, k = l;",                       // 13
    "    while (i < n1 && j < n2) {",                     // 14
    "        if (L[i] <= R[j]) arr[k++] = L[i++];",       // 15
    "        else arr[k++] = R[j++];",                    // 16
    "    }",                                              // 17
    "    while (i < n1) arr[k++] = L[i++];",              // 18
    "    while (j < n2) arr[k++] = R[j++];",              // 19
    "}"                                                   // 20
  ],
  
  java: [
    "void mergeSort(int arr[], int l, int r) {",          // 0
    "    if (l >= r) return;",                            // 1
    "    int m = l + (r - l) / 2;",                       // 2
    "    mergeSort(arr, l, m);",                          // 3
    "    mergeSort(arr, m + 1, r);",                      // 4
    "    merge(arr, l, m, r);",                           // 5
    "}",                                                  // 6
    "void merge(int arr[], int l, int m, int r) {",       // 7
    "    int n1 = m - l + 1;",                            // 8
    "    int n2 = r - m;",                                // 9
    "    int L[] = new int[n1];",                         // 10
    "    int R[] = new int[n2];",                         // 11
    "    for (int i = 0; i < n1; i++) L[i] = arr[l+i];",  // 12
    "    for (int j = 0; j < n2; j++) R[j] = arr[m+1+j];",// 13
    "    int i = 0, j = 0, k = l;",                       // 14
    "    while (i < n1 && j < n2) {",                     // 15
    "        if (L[i] <= R[j]) arr[k++] = L[i++];",       // 16
    "        else arr[k++] = R[j++];",                    // 17
    "    }",                                              // 18
    "    while (i < n1) arr[k++] = L[i++];",              // 19
    "    while (j < n2) arr[k++] = R[j++];",              // 20
    "}"                                                   // 21
  ]
};