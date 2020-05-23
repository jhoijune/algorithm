import { createRandomArray, swap } from '../../Util';

/*
Given an array containing 0s and 1 s. Write an algorithm to sort array so that 0s come first
followed by 1s. Also find the minimum number of swaps required to sort the array.
*/

const partition01 = (arr: number[]) => {
  const size = arr.length;
  let left = 0;
  let right = size - 1;
  let count = 0;
  while (left <= right) {
    while (arr[left] === 0) {
      left += 1;
    }
    while (arr[right] === 1) {
      right -= 1;
    }
    if (left < right) {
      swap(arr, left, right);
      count += 1;
    }
  }
  console.log(`count is ${count}`);
};

(() => {
  const arr = createRandomArray(100, 1);
  console.log(arr);
  partition01(arr);
})();
