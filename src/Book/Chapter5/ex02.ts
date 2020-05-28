/*
In given list of n elements, write an algorithm to find three elements in an array whose sum is a given
value.
*/

import { createRandomArray } from '../../Util';

const ex02 = (arr: number[], target: number) => {
  // time complexity O(n^2)
  // space complexity O(n)
  const size = arr.length;
  const sorted = [...arr].sort((a, b) => a - b);
  console.log(sorted);
  for (let low = 0; low < size - 2; low++) {
    let middle = low + 1;
    let high = size - 1;
    while (middle < high) {
      const sum = sorted[low] + sorted[middle] + sorted[high];
      if (sum === target) {
        console.log(`${sorted[low]} ${sorted[middle]} ${sorted[high]}`);
        return true;
      } else if (sum < target) {
        middle += 1;
      } else {
        high -= 1;
      }
    }
  }
  return false;
};

(() => {
  const arr = createRandomArray(20, 100);
  ex02(arr, 50);
})();
