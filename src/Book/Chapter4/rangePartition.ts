/*
Given an array of integer and a range. Write an algorithm to partition array so that values
smaller than range come to left, then values under the range followed with values greater than the
range.
*/

import { swap, createRandomArray } from '../../Util';

const rangeParition = (arr: number[], pivot: number) => {
  const size = arr.length;
  let left = 0;
  let right = size - 1;
  let index = 0;
  while (index <= right) {
    if (arr[index] < pivot) {
      swap(arr, index++, left++);
    } else if (arr[index] > pivot) {
      swap(arr, index, right--);
    } else {
      index += 1;
    }
  }
};

(() => {
  const arr = createRandomArray(50, 10);
  console.log(arr);
  rangeParition(arr, 5);
  console.log(arr);
})();
