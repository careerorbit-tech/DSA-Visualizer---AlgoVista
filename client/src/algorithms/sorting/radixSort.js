const getDigit = (value, exp) => Math.floor(value / exp) % 10;

export const radixSort = function* (arr) {
  let writes = 0;
  let comparisons = 0;
  let exp = 1;
  const max = Math.max(...arr, 0);

  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    swaps: writes,
    sortedIndices: [],
    pivot: exp,
    currentStep: 0
  };

  while (Math.floor(max / exp) > 0) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    yield {
      array: [...arr],
      i: -1,
      j: -1,
      comparisons,
      swaps: writes,
      sortedIndices: [],
      pivot: exp,
      currentStep: 1
    };

    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], exp);
      count[digit]++;
      writes++;
      yield {
        array: [...arr],
        i,
        j: digit,
        comparisons,
        swaps: writes,
        sortedIndices: [],
        pivot: exp,
        currentStep: 2
      };
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = getDigit(arr[i], exp);
      output[count[digit] - 1] = arr[i];
      count[digit]--;
      writes++;
      yield {
        array: [...arr],
        i,
        j: digit,
        comparisons,
        swaps: writes,
        sortedIndices: [],
        pivot: exp,
        currentStep: 3
      };
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      writes++;
      yield {
        array: [...arr],
        i,
        j: -1,
        comparisons,
        swaps: writes,
        sortedIndices: exp > max / 10 ? Array.from({ length: i + 1 }, (_, index) => index) : [],
        pivot: exp,
        currentStep: 4
      };
    }

    exp *= 10;
  }

  yield {
    array: [...arr],
    i: -1,
    j: -1,
    comparisons,
    swaps: writes,
    sortedIndices: Array.from({ length: arr.length }, (_, index) => index),
    pivot: null,
    completed: true,
    currentStep: 5
  };
};

export const pseudocode = {
  javascript: [
    'function radixSort(arr) {',
    '  for (let exp = 1; max / exp > 0; exp *= 10) {',
    '    countDigitsAtCurrentPlace(arr, exp);',
    '    buildStableOutput(arr, exp);',
    '    copyOutputBack(arr);',
    '  }',
    '  return arr;',
    '}'
  ],
  python: [
    'def radix_sort(arr):',
    '    exp = 1',
    '    while max_value // exp > 0:',
    '        count_digits(arr, exp)',
    '        build_output(arr, exp)',
    '        copy_back(arr)',
    '        exp *= 10',
    '    return arr'
  ]
};
