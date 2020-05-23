/*
Minimum swaps required to bring all elements less than given value together at the start of
array.
*/

import { swap, createRandomArray } from '../../Util';

const minSwap = (arr: number[], pivot: number) => {
  const size = arr.length;
  let left = 0;
  let right = size - 1;
  let swapCount = 0;
  while (left < right) {
    while (left < right && arr[left] < pivot) {
      left += 1;
    }
    while (left < right && arr[right] >= pivot) {
      right -= 1;
    }
    if (left <= right) {
      swap(arr, left, right);
      swapCount += 1;
    }
  }
  console.log(`count is ${swapCount}`);
};

(() => {
  const arr = createRandomArray(100, 10);
  console.log(arr);
  minSwap(arr, 5);
  console.log(arr);
})();
