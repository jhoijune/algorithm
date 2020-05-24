/*
Given an array of size N, the elements in the array may be repeated. You need to find sum of
distinct elements of the array. If there is some value repeated then they should be added once.
*/

const sumDistinct1 = (arr: number[]) => {
  // time complexity O(n)
  // space complexity O(n)
  const set: Set<number> = new Set();
  for (const value of arr) {
    set.add(value);
  }
  let sum = 0;
  for (const value of set.values()) {
    sum += value;
  }
  return sum;
};

const sumDistinct2 = (arr: number[]) => {
  const sorted = [...arr].sort((a, b) => a - b);
  let current = sorted[0];
  let sum = current;
  for (const value of sorted) {
    if (value !== current) {
      current = value;
      sum += current;
    }
  }
  return sum;
};
