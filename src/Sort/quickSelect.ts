import { swap, createRandomArray } from '../Util';

const partition = (arr: number[], start: number, end: number): number => {
  let pivot = arr[start];
  let left = start + 1;
  let right = end;
  while (left <= right) {
    while (left <= right && arr[left] < pivot) {
      left += 1;
    }
    while (left <= right && arr[right] > pivot) {
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

const QuickSelectUtil = (
  arr: number[],
  start: number,
  end: number,
  k: number
): number => {
  if (start !== end) {
    const pivot = partition(arr, start, end);
    if (k - 1 < pivot) {
      return QuickSelectUtil(arr, start, pivot - 1, k);
    } else if (k - 1 > pivot) {
      return QuickSelectUtil(arr, pivot + 1, end, k);
    } else {
      return arr[pivot];
    }
  }
  return arr[start];
};

const QuickSelect = (arr: number[], k: number): number => {
  const size = arr.length;
  if (!Number.isInteger(k)) {
    throw Error('k is not integer');
  }
  if (k > size || k < 1) {
    throw RangeError('k is not in range');
  }
  return QuickSelectUtil(arr, 0, size - 1, k);
};

(() => {
  const arr = createRandomArray(10, 10);
  console.log(arr);
  console.log(QuickSelect(arr, 5));
})();
