// Remove duplicate in an integer list.

import { createRandomArray } from '../../Util';

const removeDuplicates1 = (arr: number[]) => {
  // Time complexity worst case: O(n^2)
  //                                 best case: O(n)
  // space complexity worst case: O(n)
  //                                  best case: O(1)
  const result: number[] = [];
  for (const value of arr) {
    if (!result.includes(value)) {
      result.push(value);
    }
  }
  return result;
};

const removeDuplicates2 = (arr: number[]) => {
  // time complexity O(nlogn)
  // space complexity O(n)
  const sorted = [...arr].sort((a, b) => a - b);
  const size = arr.length;
  let j = 0;
  for (let i = 0; i < size; i++) {
    if (arr[j] !== arr[i]) {
      j += 1;
      arr[j] = arr[i];
    }
  }
  return sorted.slice(0, j + 1);
};

const removeDuplicates3 = (arr: number[]) => {
  // time complexity: O(n)
  // space complexity: O(n)
  const set: Set<number> = new Set();
  for (const value of arr) {
    set.add(value);
  }
  const result: number[] = [];
  for (const value of set.values()) {
    result.push(value);
  }
  return result;
};

(() => {
  const arr = createRandomArray(20, 10);
  console.log(arr);
  console.log(removeDuplicates3(arr));
})();
