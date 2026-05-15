export const shellSort = function* (arr) {
  let comparisons = 0;
  let shifts = 0;
  let gap = Math.floor(arr.length / 2);

  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    shifts,
    sortedIndices: [],
    pivot: gap,
    currentStep: 0
  };

  while (gap > 0) {
    yield {
      array: [...arr],
      i: -1,
      j: -1,
      comparisons,
      shifts,
      sortedIndices: [],
      pivot: gap,
      currentStep: 1
    };

    for (let i = gap; i < arr.length; i++) {
      const temp = arr[i];
      let j = i;

      yield {
        array: [...arr],
        i,
        j,
        comparisons,
        shifts,
        sortedIndices: [],
        pivot: gap,
        currentStep: 2
      };

      while (j >= gap) {
        comparisons++;
        yield {
          array: [...arr],
          i,
          j,
          comparisons,
          shifts,
          sortedIndices: [],
          pivot: gap,
          currentStep: 3
        };

        if (arr[j - gap] <= temp) {
          break;
        }

        arr[j] = arr[j - gap];
        shifts++;
        yield {
          array: [...arr],
          i,
          j,
          comparisons,
          shifts,
          sortedIndices: [],
          pivot: gap,
          currentStep: 4
        };

        j -= gap;
      }

      arr[j] = temp;
      yield {
        array: [...arr],
        i,
        j,
        comparisons,
        shifts,
        sortedIndices: [],
        pivot: gap,
        currentStep: 5
      };
    }

    gap = Math.floor(gap / 2);
    yield {
      array: [...arr],
      i: -1,
      j: -1,
      comparisons,
      shifts,
      sortedIndices: [],
      pivot: gap,
      currentStep: 6
    };
  }

  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    shifts,
    sortedIndices: Array.from({ length: arr.length }, (_, index) => index),
    pivot: null,
    completed: true,
    currentStep: 7
  };
};

export const pseudocode = {
  javascript: [
    'function shellSort(arr) {',
    '  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {',
    '    for (let i = gap; i < arr.length; i++) {',
    '      while (j >= gap && arr[j - gap] > temp) {',
    '        arr[j] = arr[j - gap];',
    '      }',
    '      arr[j] = temp;',
    '    }',
    '  }',
    '  return arr;',
    '}'
  ],
  python: [
    'def shell_sort(arr):',
    '    gap = len(arr) // 2',
    '    while gap > 0:',
    '        for i in range(gap, len(arr)):',
    '            while j >= gap and arr[j-gap] > temp:',
    '                arr[j] = arr[j-gap]',
    '            arr[j] = temp',
    '        gap //= 2',
    '    return arr'
  ]
};
