// In given list of n numbers, find the element, which appears maximum number of times.

import { createRandomArray } from '../../Util';

const getMax1 = (arr: number[]): number => {
  // time complexity: O(nlogn)
  // space complexity: O(n)
  const sorted = [...arr].sort((a, b) => a - b);
  const size = arr.length;
  let maxNum = 0;
  let maxCount = 0;
  let index = 0;
  while (index < size) {
    const current = sorted[index];
    let currentCount = 1;
    while (index < size - 1 && current === sorted[index + 1]) {
      index += 1;
      currentCount += 1;
    }
    if (currentCount > maxCount) {
      maxCount = currentCount;
      maxNum = current;
    }
    index += 1;
  }
  return maxNum;
};

const getMax2 = (arr: number[]) => {
  // time complexity O(n)
  // space complexity O(n)
  const ht: Map<number, number> = new Map();
  for (const value of arr) {
    if (ht.has(value)) {
      const exCount = ht.get(value)!;
      ht.set(value, exCount + 1);
    } else {
      ht.set(value, 1);
    }
  }
  let maxNum = 0;
  let maxCount = 0;
  for (const value of ht.keys()) {
    const count = ht.get(value)!;
    if (count > maxCount) {
      maxCount = count;
      maxNum = value;
    }
  }
  return maxNum;
};

(() => {
  const arr = createRandomArray(100, 20);
  const sorted = [...arr].sort((a, b) => a - b);
  console.log(sorted);
  console.log(getMax2(sorted));
})();
