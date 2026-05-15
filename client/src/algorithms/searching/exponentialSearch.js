export const exponentialSearch = function* (arr, target) {
  const sortedArray = [...arr].sort((a, b) => a - b);
  let comparisons = 0;

  yield {
    array: [...sortedArray],
    currentIndex: 0,
    left: 0,
    right: sortedArray.length - 1,
    target,
    comparisons,
    found: false,
    currentStep: 0
  };

  if (sortedArray[0] === target) {
    yield {
      array: [...sortedArray],
      currentIndex: 0,
      left: 0,
      right: 0,
      target,
      comparisons: comparisons + 1,
      found: true,
      completed: true,
      currentStep: 1
    };
    return;
  }

  let bound = 1;
  while (bound < sortedArray.length && sortedArray[bound] < target) {
    comparisons++;
    yield {
      array: [...sortedArray],
      currentIndex: bound,
      left: Math.floor(bound / 2),
      right: Math.min(bound, sortedArray.length - 1),
      target,
      comparisons,
      found: false,
      currentStep: 2
    };
    bound *= 2;
  }

  let left = Math.floor(bound / 2);
  let right = Math.min(bound, sortedArray.length - 1);

  yield {
    array: [...sortedArray],
    currentIndex: left,
    left,
    right,
    target,
    comparisons,
    found: false,
    currentStep: 3
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;
    yield {
      array: [...sortedArray],
      currentIndex: mid,
      left,
      right,
      target,
      comparisons,
      found: false,
      currentStep: 4
    };

    if (sortedArray[mid] === target) {
      yield {
        array: [...sortedArray],
        currentIndex: mid,
        left,
        right,
        target,
        comparisons,
        found: true,
        completed: true,
        currentStep: 5
      };
      return;
    }

    if (sortedArray[mid] < target) {
      left = mid + 1;
      yield {
        array: [...sortedArray],
        currentIndex: mid,
        left,
        right,
        target,
        comparisons,
        found: false,
        currentStep: 6
      };
    } else {
      right = mid - 1;
      yield {
        array: [...sortedArray],
        currentIndex: mid,
        left,
        right,
        target,
        comparisons,
        found: false,
        currentStep: 7
      };
    }
  }

  yield {
    array: [...sortedArray],
    currentIndex: -1,
    left,
    right,
    target,
    comparisons,
    found: false,
    completed: true,
    currentStep: 8
  };
};

export const pseudocode = {
  javascript: [
    'function exponentialSearch(arr, target) {',
    '  if (arr[0] === target) return 0;',
    '  while (bound < arr.length && arr[bound] < target) bound *= 2;',
    '  let left = bound / 2;',
    '  let right = Math.min(bound, arr.length - 1);',
    '  while (left <= right) {',
    '    if (arr[mid] === target) return mid;',
    '    if (arr[mid] < target) left = mid + 1;',
    '    else right = mid - 1;',
    '  }',
    '  return -1;',
    '}'
  ],
  python: [
    'def exponential_search(arr, target):',
    '    if arr[0] == target: return 0',
    '    while bound < len(arr) and arr[bound] < target:',
    '        bound *= 2',
    '    left = bound // 2',
    '    right = min(bound, len(arr) - 1)',
    '    while left <= right:',
    '        if arr[mid] == target: return mid',
    '    return -1'
  ]
};
