// In a sorted list, find a number. If found then return the index if not found then insert into the array.

import { createRandomArray } from '../../Util';

const ex07 = (arr: number[], target: number) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  let mid = 0;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  if (arr[mid] > target) {
    arr.splice(mid, 0, target);
  } else {
    arr.splice(mid + 1, 0, target);
  }
  return -1;
};

(() => {
  const arr = createRandomArray(20, 100);
  arr.sort((a, b) => a - b);
  console.log(arr);
  console.log(ex07(arr, 50));
  console.log(arr);
})();
