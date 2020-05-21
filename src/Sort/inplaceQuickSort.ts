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

const inplaceQuickSortUtil = (arr: number[], start: number, end: number) => {
  if (start < end) {
    const pivot = partition(arr, start, end);
    inplaceQuickSortUtil(arr, start, pivot - 1);
    inplaceQuickSortUtil(arr, pivot + 1, end);
  }
};

const inplaceQuickSort = (arr: number[]) => {
  const size = arr.length;
  inplaceQuickSortUtil(arr, 0, size - 1);
};

(() => {
  const arr = createRandomArray(10, 10);
  console.log(arr);
  inplaceQuickSort(arr);
  console.log(arr);
})();
