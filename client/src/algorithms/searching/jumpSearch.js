// client/src/algorithms/searching/jumpSearch.js

export const jumpSearch = function* (arr, target) {
  let comparisons = 0;
  const n = arr.length;

  // Sort array first (required for Jump Search)
  const sortedArray = [...arr].sort((a, b) => a - b);

  // Initial state
  yield {
    array: [...sortedArray],
    currentIndex: -1,
    left: 0,
    right: n - 1,
    target,
    comparisons,
    found: false,
    completed: false,
    currentStep: 0
  };

  let step = Math.floor(Math.sqrt(n));
  let prev = 0;

  // Jump through blocks
  while (prev < n && sortedArray[Math.min(step, n) - 1] < target) {
    comparisons++;
    yield {
      array: [...sortedArray],
      currentIndex: Math.min(step, n) - 1,
      left: prev,
      right: Math.min(step, n) - 1,
      target,
      comparisons,
      found: false,
      currentStep: 1
    };
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      yield {
        array: [...sortedArray],
        currentIndex: -1,
        left: 0,
        right: n - 1,
        target,
        comparisons,
        found: false,
        completed: true,
        currentStep: 4
      };
      return;
    }
  }

  // Linear search in block
  while (prev < Math.min(step, n) && sortedArray[prev] < target) {
    comparisons++;
    yield {
      array: [...sortedArray],
      currentIndex: prev,
      left: prev,
      right: Math.min(step, n) - 1,
      target,
      comparisons,
      found: false,
      currentStep: 2
    };
    prev++;
  }

  // Check if found
  if (prev < n && sortedArray[prev] === target) {
    comparisons++;
    yield {
      array: [...sortedArray],
      currentIndex: prev,
      left: prev,
      right: Math.min(step, n) - 1,
      target,
      comparisons,
      found: true,
      completed: true,
      currentStep: 3
    };
    return;
  }

  // Not found
  yield {
    array: [...sortedArray],
    currentIndex: -1,
    left: 0,
    right: n - 1,
    target,
    comparisons,
    found: false,
    completed: true,
    currentStep: 4
  };
};

export const pseudocode = {
  javascript: [
    "function jumpSearch(arr, target) {",          // 0
    "  arr.sort((a, b) => a - b);",               // 1
    "  let n = arr.length;",                       // 2
    "  let step = Math.floor(Math.sqrt(n));",     // 3
    "  let prev = 0;",                             // 4
    "  while (arr[Math.min(step, n) - 1] < target) {", // 5
    "    prev = step;",                            // 6
    "    step += Math.floor(Math.sqrt(n));",      // 7
    "    if (prev >= n) return -1;",              // 8
    "  }",                                         // 9
    "  while (arr[prev] < target) {",             // 10
    "    prev++;",                                 // 11
    "    if (prev == Math.min(step, n)) return -1;", // 12
    "  }",                                         // 13
    "  if (arr[prev] == target) return prev;",    // 14
    "  return -1;",                                // 15
    "}"                                           // 16
  ],

  python: [
    "def jump_search(arr, target):",                 // 0
    "    arr.sort()",                                // 1
    "    n = len(arr)",                              // 2
    "    step = int(n ** 0.5)",                      // 3
    "    prev = 0",                                  // 4
    "    while arr[min(step, n) - 1] < target:",    // 5
    "        prev = step",                           // 6
    "        step += int(n ** 0.5)",                 // 7
    "        if prev >= n: return -1",              // 8
    "    while arr[prev] < target:",                // 9
    "        prev += 1",                             // 10
    "        if prev == min(step, n): return -1",   // 11
    "    if arr[prev] == target: return prev",      // 12
    "    return -1"                                  // 13
  ],

  cpp: [
    "int jumpSearch(vector<int>& arr, int target) {", // 0
    "    sort(arr.begin(), arr.end());",             // 1
    "    int n = arr.size();",                       // 2
    "    int step = sqrt(n);",                       // 3
    "    int prev = 0;",                             // 4
    "    while (arr[min(step, n) - 1] < target) {", // 5
    "        prev = step;",                          // 6
    "        step += sqrt(n);",                      // 7
    "        if (prev >= n) return -1;",            // 8
    "    }",                                         // 9
    "    while (arr[prev] < target) {",             // 10
    "        prev++;",                               // 11
    "        if (prev == min(step, n)) return -1;", // 12
    "    }",                                         // 13
    "    if (arr[prev] == target) return prev;",    // 14
    "    return -1;",                                // 15
    "}"                                             // 16
  ],

  java: [
    "int jumpSearch(int arr[], int target) {",         // 0
    "    Arrays.sort(arr);",                           // 1
    "    int n = arr.length;",                         // 2
    "    int step = (int)Math.floor(Math.sqrt(n));",  // 3
    "    int prev = 0;",                               // 4
    "    while (arr[Math.min(step, n) - 1] < target) {", // 5
    "        prev = step;",                            // 6
    "        step += (int)Math.floor(Math.sqrt(n));", // 7
    "        if (prev >= n) return -1;",              // 8
    "    }",                                          // 9
    "    while (arr[prev] < target) {",               // 10
    "        prev++;",                                // 11
    "        if (prev == Math.min(step, n)) return -1;", // 12
    "    }",                                          // 13
    "    if (arr[prev] == target) return prev;",      // 14
    "    return -1;",                                 // 15
    "}"                                              // 16
  ]
};
