/*
Given an array of even and odd numbers, write a program to separate even numbers from the
odd numbers.
*/

import { swap, createRandomArray } from '../../Util';

const separateEvenAndOddNumbers = (arr: number[]) => {
  // time complexity O(n)
  const size = arr.length;
  let left = 0;
  let right = size - 1;
  while (left < right) {
    while (arr[left] % 2 === 0) {
      left += 1;
    }
    while (arr[right] % 2 !== 0) {
      right -= 1;
    }
    if (left < right) {
      swap(arr, left++, right--);
    }
  }
};

const separateEvenAndOddNumbers1 = (arr: number[]) => {
  // time complexity: O(n)
  // space complexity: O(n)
  const copied = [...arr];
  const size = arr.length;
  let left = 0;
  let right = size - 1;
  for (const num of copied) {
    if (num % 2 === 0) {
      arr[left++] = num;
    } else {
      arr[right--] = num;
    }
  }
};

(() => {
  const arr = createRandomArray(20, 100);
  separateEvenAndOddNumbers1(arr);
  console.log(arr);
})();
