// client/src/algorithms/searching/linearSearch.js
export const linearSearch = function* (arr, target) {
  let comparisons = 0;
  
  // Initial state - show function declaration
  yield {
    array: [...arr],
    currentIndex: -1,
    target: target,
    comparisons,
    found: false,
    currentStep: 0
  };
  
  // Show loop initialization
  yield {
    array: [...arr],
    currentIndex: -1,
    target: target,
    comparisons,
    found: false,
    currentStep: 1
  };
  
  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    
    // Show current index
    yield {
      array: [...arr],
      currentIndex: i,
      target: target,
      comparisons,
      found: false,
      currentStep: 2
    };
    
    // Show comparison
    yield {
      array: [...arr],
      currentIndex: i,
      target: target,
      comparisons,
      found: false,
      currentStep: 3
    };
    
    if (arr[i] === target) {
      // Show found
      yield {
        array: [...arr],
        currentIndex: i,
        target: target,
        comparisons,
        found: true,
        currentStep: 4
      };
      
      // Show return index
      yield {
        array: [...arr],
        currentIndex: i,
        target: target,
        comparisons,
        found: true,
        currentStep: 5
      };
      return;
    }
    
    // Show loop increment
    yield {
      array: [...arr],
      currentIndex: i,
      target: target,
      comparisons,
      found: false,
      currentStep: 6
    };
  }
  
  // Show return -1 (not found)
  yield {
    array: [...arr],
    currentIndex: -1,
    target: target,
    comparisons,
    found: false,
    completed: true,
    currentStep: 7
  };
};

export const pseudocode = {
  javascript: [
    "function linearSearch(arr, target) {",
    "  for (let i = 0; i < arr.length; i++) {",
    "    if (arr[i] === target) {",
    "      return i; // Found",
    "    }",
    "  }",
    "  return -1; // Not found",
    "}"
  ],
  python: [
    "def linear_search(arr, target):",
    "    for i in range(len(arr)):",
    "        if arr[i] == target:",
    "            return i  # Found",
    "    return -1  # Not found"
  ],
  cpp: [
    "int linearSearch(vector<int>& arr, int target) {", // 0
    "    for (int i = 0; i < arr.size(); i++) {",       // 1
    "        if (arr[i] == target) {",                  // 2
    "            return i;",                            // 3
    "        }",                                        // 4
    "    }",                                            // 5
    "    return -1;",                                   // 6
    "}"                                                 // 7
  ],
  java: [
    "int linearSearch(int arr[], int target) {",        // 0
    "    for (int i = 0; i < arr.length; i++) {",       // 1
    "        if (arr[i] == target) {",                  // 2
    "            return i;",                            // 3
    "        }",                                        // 4
    "    }",                                            // 5
    "    return -1;",                                   // 6
    "}"                                                 // 7
  ]
};
