export const countingSort = function* (arr) {
  let comparisons = 0;
  let writes = 0;
  const max = Math.max(...arr, 0);
  const count = new Array(max + 1).fill(0);

  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    swaps: writes,
    sortedIndices: [],
    pivot: null,
    currentStep: 0
  };

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
    writes++;
    yield {
      array: [...arr],
      i,
      j: arr[i],
      comparisons,
      swaps: writes,
      sortedIndices: [],
      pivot: null,
      currentStep: 1
    };
  }

  let index = 0;
  for (let value = 0; value < count.length; value++) {
    while (count[value] > 0) {
      arr[index] = value;
      count[value]--;
      writes++;
      yield {
        array: [...arr],
        i: index,
        j: value,
        comparisons,
        swaps: writes,
        sortedIndices: Array.from({ length: index + 1 }, (_, sortedIndex) => sortedIndex),
        pivot: null,
        currentStep: 2
      };
      index++;
    }
  }

  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    swaps: writes,
    sortedIndices: Array.from({ length: arr.length }, (_, sortedIndex) => sortedIndex),
    pivot: null,
    completed: true,
    currentStep: 3
  };
};

export const pseudocode = {
  javascript: [
    'function countingSort(arr) {',
    '  for (const value of arr) count[value]++;',
    '  for (let value = 0; value < count.length; value++) {',
    '    while (count[value] > 0) arr[index++] = value;',
    '  }',
    '  return arr;',
    '}'
  ],
  python: [
    'def counting_sort(arr):',
    '    for value in arr: count[value] += 1',
    '    for value in range(len(count)):',
    '        while count[value] > 0:',
    '            arr[index] = value',
    '    return arr'
  ]
};
