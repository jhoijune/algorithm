/*
Given an array containing 0s, 1s and 2s. Write an algorithm to sort array so that 0s come first
followed by 1s and then 2s in the end.
*/

import { swap, createRandomArray } from '../../Util';

const partition012_1 = (arr: number[]) => {
  const aux: number[] = new Array(3).fill(0);
  const size = aux.length;
  for (const num of arr) {
    aux[num] += 1;
  }
  let insertIndex = 0;
  for (let index = 0; index < size; index++) {
    for (let count = aux[index]; count > 0; count--) {
      arr[insertIndex++] = index;
    }
  }
};

const parition012_2 = (arr: number[]) => {
  const size = arr.length;
  let left = 0;
  let right = size - 1;
  let index = 0;
  while (index <= right) {
    if (arr[index] === 0) {
      swap(arr, index++, left++);
    } else if (arr[index] === 2) {
      swap(arr, index, right--);
    } else {
      index += 1;
    }
  }
};

(() => {
  const arr = createRandomArray(100, 2);
  console.log(arr);
  partition012_1(arr);
  console.log(arr);
})();
