// Given an array of n numbers, find two elements such that their sum is equal to "value"

import { createRandomArray } from '../../Util';

const findPair1 = (arr: number[], value: number): boolean => {
  const size = arr.length;
  if (size < 2) {
    throw Error('Array length must be greater than 2');
  }
  const sorted = [...arr].sort((a, b) => a - b);
  for (let left = 0, right = size - 1; left < right; ) {
    const sum = sorted[left] + sorted[right];
    if (sum < value) {
      left += 1;
    } else if (sum > value) {
      right -= 1;
    } else {
      console.log(`The pair is ${sorted[left]},${sorted[right]}`);
      return true;
    }
  }
  return false;
};

const findPair2 = (arr: number[], value: number) => {
  const size = arr.length;
  if (size < 2) {
    throw Error('Array length must be greater than 2');
  }
  const ht: Map<number, number> = new Map();
  for (const num of arr) {
    const diff = value - num;
    if (ht.has(diff)) {
      console.log(`The pair is ${num},${diff}`);
      return true;
    }
    if (ht.has(num)) {
      const exCount = ht.get(num)!;
      ht.set(num, exCount + 1);
    } else {
      ht.set(num, 1);
    }
  }
  return false;
};

(() => {
  const arr = createRandomArray(10, 100);
  console.log(findPair2(arr, 30));
})();
