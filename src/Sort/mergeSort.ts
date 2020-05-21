import isSorted from './isSorted';
import { createRandomArray } from '../Util';

const merge = (
  arr1: number[],
  arr2: number[],
  arr: number[],
  isAscending: boolean = true
) => {
  const size = arr.length;
  const size1 = arr1.length;
  const size2 = arr2.length;
  let i = 0;
  let j = 0;
  while (i + j < size) {
    if (j == size2 || (i < size1 && isSorted(arr1[i], arr2[j], isAscending))) {
      arr[i + j] = arr1[i];
      i += 1;
    } else {
      arr[i + j] = arr2[j];
      j += 1;
    }
  }
};

const mergeSort = (arr: number[], isAscending: boolean = true) => {
  const size = arr.length;
  if (size < 2) {
    return;
  }
  const mid = Math.floor(size / 2);
  const arr1 = arr.slice(0, mid);
  const arr2 = arr.slice(mid);
  mergeSort(arr1, isAscending);
  mergeSort(arr2, isAscending);
  merge(arr1, arr2, arr, isAscending);
};

(() => {
  const arr = createRandomArray(10, 100);
  console.log(arr);
  mergeSort(arr);
  console.log(arr);
})();
