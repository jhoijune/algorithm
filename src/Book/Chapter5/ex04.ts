// In given list of 1's and 0's, write a program to separate 0's from 1's.

import { swap } from '../../Util';

const ex04 = (arr: number[]) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  while (low < high) {
    while (arr[low] === 0) {
      low += 1;
    }
    while (arr[high] === 1) {
      high -= 1;
    }
    if (low < high) {
      swap(arr, low, high);
    }
  }
};
