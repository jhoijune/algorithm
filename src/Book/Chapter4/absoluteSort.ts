/*
Sort array according to the absolute difference from the given value
*/

import { swap, createRandomArray } from '../../Util';

const calculateDiff = (num: number, basis: number) => Math.abs(num - basis);

const partition = (
  arr: number[],
  start: number,
  end: number,
  value: number
): number => {
  let pivot = calculateDiff(arr[start], value);
  let left = start + 1;
  let right = end;
  while (left <= right) {
    while (left <= right && calculateDiff(arr[left], value) < pivot) {
      left += 1;
    }
    while (left <= right && calculateDiff(arr[right], value) > pivot) {
      right -= 1;
    }
    if (left <= right) {
      swap(arr, left, right);
      left += 1;
      right -= 1;
    }
  }
  swap(arr, start, right);
  return right;
};

const absoluteSortUtil = (
  arr: number[],
  start: number,
  end: number,
  value: number
) => {
  if (start < end) {
    const pivot = partition(arr, start, end, value);
    absoluteSortUtil(arr, start, pivot - 1, value);
    absoluteSortUtil(arr, pivot + 1, end, value);
  }
};

const absoluteSort = (arr: number[], value: number) => {
  const size = arr.length;
  absoluteSortUtil(arr, 0, size - 1, value);
};

(() => {
  const arr = createRandomArray(10, 100);
  console.log(arr);
  absoluteSort(arr, 50);
  console.log(arr);
})();
