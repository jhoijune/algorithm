// Given two unsorted arrays, find union and intersection of these two arrays.

import { createRandomArray } from '../../Util';

const unionIntersectionSorted = (arr1: number[], arr2: number[]) => {
  // time complexity: O(n+m)
  const ht: Map<number, number> = new Map();
  const onlyArr1 = 1; // 1: arr1에만 있는 경우
  const onlyArr2 = 2; // 2: arr2에만 있는 경우
  const arr1AndArr2 = 3; // 3: arr1과 arr2에 다 있는 경우
  for (const num of arr1) {
    if (!ht.has(num)) {
      ht.set(num, onlyArr1);
    }
  }
  for (const num of arr2) {
    if (!ht.has(num)) {
      ht.set(num, onlyArr2);
    } else {
      const exValue = ht.get(num);
      if (exValue === onlyArr1) {
        ht.set(num, arr1AndArr2);
      }
    }
  }
  const union = [];
  const intersection = [];
  for (const num of ht.keys()) {
    union.push(num);
    if (ht.get(num) === arr1AndArr2) {
      intersection.push(num);
    }
  }
  return {
    union,
    intersection,
  };
};

(() => {
  const arr1 = createRandomArray(10, 10);
  const arr2 = createRandomArray(10, 10);
  console.log(arr1);
  console.log(arr2);
  const { union, intersection } = unionIntersectionSorted(arr1, arr2);
  console.log(union);
  console.log(intersection);
})();
