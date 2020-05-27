/*
Given a sorted array and a number. You need to find the element in array which is closest to
the given number.
*/

import { createRandomArray } from '../../Util';

const findClosestNumber = (arr: number[], value: number) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  let minDiff: null | number = null;
  let output: number | null;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const currDiff = Math.abs(arr[mid] - value);
    if (minDiff === null || currDiff < minDiff) {
      minDiff = currDiff;
      output = arr[mid];
    }
    if (arr[mid] === value) {
      break;
    } else if (arr[mid] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return output!;
};

(() => {
  const arr = createRandomArray(20, 100);
  arr.sort((a, b) => a - b);
  console.log(arr);
  console.log(findClosestNumber(arr, 50));
})();
