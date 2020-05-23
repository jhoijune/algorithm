/*
Given two array, sort first array according to the order defined in second array
*/

import { createRandomArray, swap } from '../../Util';

const sortByOrder = (arr1: number[], arr2: number[]) => {
  // O(n*m)
  const size = arr1.length;
  let insertIndex = 0;
  for (const num of arr2) {
    for (let i = insertIndex; i < size; i++) {
      if (arr1[i] === num) {
        swap(arr1, i, insertIndex++);
      }
    }
  }
};

const sortByOrder1 = (arr1: number[], arr2: number[]) => {
  // O(n+m)
  const hs: Map<number, number> = new Map();
  for (const num of arr1) {
    if (hs.has(num)) {
      const exValue = hs.get(num)!;
      hs.set(num, exValue + 1);
    } else {
      hs.set(num, 1);
    }
  }
  let insertIndex = 0;
  for (const num of arr2) {
    if (hs.has(num)) {
      const count = hs.get(num)!;
      for (let _ = 0; _ < count; _++) {
        arr1[insertIndex++] = num;
      }
      hs.delete(num);
    }
  }
  for (const num of hs.keys()) {
    const count = hs.get(num)!;
    for (let _ = 0; _ < count; _++) {
      arr1[insertIndex++] = num;
    }
  }
};

(() => {
  const arr1 = createRandomArray(20, 10);
  const arr2 = createRandomArray(4, 10);
  console.log(arr1, arr2);
  sortByOrder1(arr1, arr2);
  console.log(arr1);
})();
