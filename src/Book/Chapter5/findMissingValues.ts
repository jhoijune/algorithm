/*
Given an array, find the maximum and minimum value in the array and also find the values in
range minimum and maximum that are absent in the array.
*/

import { createRandomArray } from '../../Util';

const findMissingValues1 = (arr: number[]) => {
  // time complexity O(nlogn)
  // space complexity O(n)
  const sorted = [...arr].sort((a, b) => a - b);
  let current = sorted[0];
  const missing: number[] = [];
  for (const value of sorted) {
    for (let fill = current + 1; fill < value; fill++) {
      missing.push(fill);
    }
    current = value;
  }
  return missing;
};

const findMissingValues2 = (arr: number[]) => {
  // time complexity O(n) or O(max-min)
  // space complexity O(n)
  const set: Set<number> = new Set();
  let minValue: number | null = null;
  let maxValue: number | null = null;
  for (const value of arr) {
    set.add(value);
    if (minValue === null || minValue > value) {
      minValue = value;
    }
    if (maxValue === null || maxValue < value) {
      maxValue = value;
    }
  }
  const missing: number[] = [];
  for (let value = minValue! + 1; value < maxValue!; value++) {
    if (!set.has(value)) {
      missing.push(value);
    }
  }
  return missing;
};

(() => {
  const arr = createRandomArray(10, 20);
  console.log(arr);
  console.log(findMissingValues2(arr));
})();
