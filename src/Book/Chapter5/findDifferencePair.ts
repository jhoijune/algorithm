/*
In an array of positive integers, find a pair whose absolute value of difference is equal to a
given value.
*/

import { createRandomArray } from '../../Util';

const findDifferencePair1 = (arr: number[], value: number): boolean => {
  // time complexity worst O(n^2)
  //                                 best O(nlogn)
  // space complexity O(n)
  const size = arr.length;
  if (size < 2) {
    throw Error('Array length must be greater than 1');
  }
  const sorted = [...arr].sort((a, b) => a - b);
  console.log(sorted);
  let low = 0;
  let high = 1;
  while (low < size && high < size) {
    if (low !== high) {
      const diff = sorted[high] - sorted[low];
      if (diff > value) {
        low += 1;
      } else if (diff < value) {
        high += 1;
      } else {
        console.log(`(${sorted[low]},${sorted[high]})`);
        return true;
      }
    } else {
      high += 1;
    }
  }
  return false;
};

(() => {
  const arr = createRandomArray(10, 20);
  console.log(findDifferencePair1(arr, 5));
})();
