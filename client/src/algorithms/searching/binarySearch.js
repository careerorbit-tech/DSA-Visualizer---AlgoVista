// client/src/algorithms/searching/binarySearch.js
export const binarySearch = function* (arr, target) {
  let comparisons = 0;
  let left = 0;
  let right = arr.length - 1;
  
  // Array must be sorted for binary search
  const sortedArray = [...arr].sort((a, b) => a - b);
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;
    
    // Show current middle element
    yield {
      array: [...sortedArray],
      currentIndex: mid,
      left: left,
      right: right,
      target: target,
      comparisons,
      found: false,
      currentStep: 2 // Middle calculation
    };
    
    if (sortedArray[mid] === target) {
      yield {
        array: [...sortedArray],
        currentIndex: mid,
        left: left,
        right: right,
        target: target,
        comparisons,
        found: true,
        currentStep: 3 // Found step
      };
      return;
    }
    
    if (sortedArray[mid] < target) {
      left = mid + 1;
      yield {
        array: [...sortedArray],
        currentIndex: mid,
        left: left,
        right: right,
        target: target,
        comparisons,
        found: false,
        currentStep: 4 // Search right half
      };
    } else {
      right = mid - 1;
      yield {
        array: [...sortedArray],
        currentIndex: mid,
        left: left,
        right: right,
        target: target,
        comparisons,
        found: false,
        currentStep: 5 // Search left half
      };
    }
  }
  
  // Target not found
  yield {
    array: [...sortedArray],
    currentIndex: -1,
    left: left,
    right: right,
    target: target,
    comparisons,
    found: false,
    completed: true,
    currentStep: 6 // Not found step
  };
};

export const pseudocode = {
  javascript: [
    "function binarySearch(arr, target) {",
    "  let left = 0, right = arr.length - 1;",
    "  while (left <= right) {",
    "    let mid = Math.floor((left + right) / 2);",
    "    if (arr[mid] === target) return mid;",
    "    if (arr[mid] < target) left = mid + 1;",
    "    else right = mid - 1;",
    "  }",
    "  return -1;",
    "}"
  ],

  python: [
    "def binary_search(arr, target):",         // 0
    "    left, right = 0, len(arr) - 1",       // 1
    "    while left <= right:",                // 2
    "        mid = (left + right) // 2",       // 3
    "        if arr[mid] == target:",          // 4
    "            return mid",                  // 5
    "        elif arr[mid] < target:",         // 6
    "            left = mid + 1",              // 7
    "        else:",                           // 8
    "            right = mid - 1",             // 9
    "    return -1"                            // 10
  ],

  cpp: [
    "int binarySearch(vector<int>& arr, int target) {", // 0
    "    int left = 0, right = arr.size() - 1;",        // 1
    "    while (left <= right) {",                      // 2
    "        int mid = left + (right - left) / 2;",     // 3
    "        if (arr[mid] == target)",                  // 4
    "            return mid;",                          // 5
    "        else if (arr[mid] < target)",              // 6
    "            left = mid + 1;",                      // 7
    "        else",                                     // 8
    "            right = mid - 1;",                     // 9
    "    }",                                            // 10
    "    return -1;",                                   // 11
    "}"                                                 // 12
  ],
  
  java: [
    "int binarySearch(int arr[], int target) {",        // 0
    "    int left = 0, right = arr.length - 1;",        // 1
    "    while (left <= right) {",                      // 2
    "        int mid = left + (right - left) / 2;",     // 3
    "        if (arr[mid] == target) {",                // 4
    "            return mid;",                          // 5
    "        } else if (arr[mid] < target) {",          // 6
    "            left = mid + 1;",                      // 7
    "        } else {",                                 // 8
    "            right = mid - 1;",                     // 9
    "        }",                                        // 10
    "    }",                                            // 11
    "    return -1;",                                   // 12
    "}"                                                 // 13
  ]
};