// Given an array, sort elements in the order of their frequency.

import { createRandomArray } from '../../Util';

const ex16 = <T extends string | number | Symbol>(arr: T[]) => {
  // worst-case O(nlogn)
  // best-case O(n);
  const ht: Map<T, number> = new Map();
  for (const value of arr) {
    if (ht.has(value)) {
      const exCount = ht.get(value)!;
      ht.set(value, exCount + 1);
    } else {
      ht.set(value, 1);
    }
  }
  const entries: { key: T; value: number }[] = [];
  ht.forEach((value, key) => entries.push({ key, value }));
  entries.sort((left, right) => left.value - right.value);
  let insertIndex = 0;
  for (const { key, value } of entries) {
    for (let count = 0; count < value; count++) {
      arr[insertIndex++] = key;
    }
  }
};

(() => {
  const arr = createRandomArray(100, 20);
  ex16(arr);
  console.log(arr);
})();
