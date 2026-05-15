// client/src/algorithms/searching/interpolationSearch.js

export const interpolationSearch = function* (arr, target) {
  let comparisons = 0;

  // Make sure array is sorted first
  const sortedArray = [...arr].sort((a, b) => a - b);
  let low = 0;
  let high = sortedArray.length - 1;

  // Initial state
  yield {
    array: [...sortedArray],
    currentIndex: -1,
    left: low,
    right: high,
    target,
    comparisons,
    found: false,
    completed: false,
    currentStep: 0
  };

  while (low <= high && target >= sortedArray[low] && target <= sortedArray[high]) {
    if (sortedArray[high] === sortedArray[low]) {
      comparisons++;
      if (sortedArray[low] === target) {
        yield {
          array: [...sortedArray],
          currentIndex: low,
          left: low,
          right: high,
          target,
          comparisons,
          found: true,
          completed: true,
          currentStep: 2
        };
        return;
      }
      break;
    }

    let pos = low + Math.floor(((target - sortedArray[low]) * (high - low)) / (sortedArray[high] - sortedArray[low]));
    comparisons++;

    // Show current probing position
    yield {
      array: [...sortedArray],
      currentIndex: pos,
      left: low,
      right: high,
      target,
      comparisons,
      found: false,
      currentStep: 1
    };

    if (sortedArray[pos] === target) {
      yield {
        array: [...sortedArray],
        currentIndex: pos,
        left: low,
        right: high,
        target,
        comparisons,
        found: true,
        completed: true,
        currentStep: 2
      };
      return;
    }

    if (sortedArray[pos] < target) {
      low = pos + 1;
      yield {
        array: [...sortedArray],
        currentIndex: pos,
        left: low,
        right: high,
        target,
        comparisons,
        found: false,
        currentStep: 3 // searching right
      };
    } else {
      high = pos - 1;
      yield {
        array: [...sortedArray],
        currentIndex: pos,
        left: low,
        right: high,
        target,
        comparisons,
        found: false,
        currentStep: 4 // searching left
      };
    }
  }

  // Not found
  yield {
    array: [...sortedArray],
    currentIndex: -1,
    left: low,
    right: high,
    target,
    comparisons,
    found: false,
    completed: true,
    currentStep: 5
  };
};

// Pseudocode mapping for visualization
export const pseudocode = {
  javascript: [
    "function interpolationSearch(arr, target) {",      // 0
    "  arr.sort((a, b) => a - b);",                      // 1
    "  let n = arr.length;",                              // 2
    "  let low = 0, high = n - 1;",                      // 3
    "  while (low <= high && target >= arr[low] && target <= arr[high]) {", // 4
    "    let pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));", // 5
    "    if (arr[pos] === target) return pos;",          // 6
    "    if (arr[pos] < target) low = pos + 1;",        // 7
    "    else high = pos - 1;",                          // 8
    "  }",                                               // 9
    "  return -1;",                                      // 10
    "}"                                                  // 11
  ],
  python: [
    "def interpolation_search(arr, target):",            // 0
    "    arr.sort()",                                    // 1
    "    n = len(arr)",                                  // 2
    "    low, high = 0, n - 1",                         // 3
    "    while low <= high and target >= arr[low] and target <= arr[high]:", // 4
    "        pos = low + int((target - arr[low]) * (high - low) / (arr[high] - arr[low]))", // 5
    "        if arr[pos] == target:",                   // 6
    "            return pos",                            // 7
    "        if arr[pos] < target:",                    // 8
    "            low = pos + 1",                        // 9
    "        else:",                                    // 10
    "            high = pos - 1",                       // 11
    "    return -1"                                     // 12
  ],
  cpp: [
    "int interpolationSearch(vector<int>& arr, int target) {", // 0
    "    sort(arr.begin(), arr.end());",                        // 1
    "    int n = arr.size();",                                  // 2
    "    int low = 0, high = n - 1;",                           // 3
    "    while (low <= high && target >= arr[low] && target <= arr[high]) {", // 4
    "        int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);", // 5
    "        if (arr[pos] == target) return pos;",             // 6
    "        if (arr[pos] < target) low = pos + 1;",          // 7
    "        else high = pos - 1;",                            // 8
    "    }",                                                    // 9
    "    return -1;",                                           // 10
    "}"                                                         // 11
  ],
  java: [
    "int interpolationSearch(int[] arr, int target) {",       // 0
    "    Arrays.sort(arr);",                                   // 1
    "    int n = arr.length;",                                 // 2
    "    int low = 0, high = n - 1;",                          // 3
    "    while (low <= high && target >= arr[low] && target <= arr[high]) {", // 4
    "        int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);", // 5
    "        if (arr[pos] == target) return pos;",            // 6
    "        if (arr[pos] < target) low = pos + 1;",         // 7
    "        else high = pos - 1;",                           // 8
    "    }",                                                   // 9
    "    return -1;",                                          // 10
    "}"                                                        // 11
  ]
};
