/*
In given an array of n elements. Find the majority element, which appears more than n/2
times. Return 0 in case there is no majority element.
*/

const getMajority1 = (arr: number[]): number => {
  // time complexity O(nlogn)
  // space complexity O(n)
  const size = arr.length;
  const baseCount = Math.ceil((size + 1) / 2);
  const sorted = [...arr].sort((a, b) => a - b);
  const majIndex = Math.floor(size / 2);
  const candidate = sorted[majIndex];
  let count = 0;
  for (let index = 0; index < size; index++) {
    if (sorted[index] === candidate) {
      count += 1;
    } else if (sorted[index] > candidate) {
      break;
    }
  }
  if (count >= baseCount) {
    return candidate;
  }
  return 0;
};

const getMajority2 = (arr: number[]): number => {
  // time complexity O(n)
  // space complexity O(n)
  const size = arr.length;
  const baseCount = Math.ceil((size + 1) / 2);
  const ht: Map<number, number> = new Map();
  for (const value of arr) {
    if (ht.has(value)) {
      const exCount = ht.get(value)!;
      if (exCount + 1 >= baseCount) {
        return value;
      }
      ht.set(value, exCount + 1);
    } else {
      ht.set(value, 1);
    }
  }
  return 0;
};

const getMajority3 = (arr: number[]): number => {
  // INFO: Boyer-Moore majority vote algorithm
  // time complexity O(n)
  // space complexity O(1)
  const size = arr.length;
  const baseCount = Math.ceil((size + 1) / 2);
  let majIndex = 0;
  let candidate = arr[majIndex];
  let count = 1;
  for (let index = 1; index < size; index++) {
    if (arr[index] === candidate) {
      count += 1;
    } else {
      count -= 1;
    }
    if (count === 0) {
      majIndex = index;
      candidate = arr[majIndex];
      count = 1;
    }
  }
  count = 0;
  for (const value of arr) {
    if (value === candidate) {
      count += 1;
    }
  }
  if (count >= baseCount) {
    return candidate;
  }
  return 0;
};

(() => {
  const arr = [1, 3, 5, 3, 1, 2, 4, 2, 2, 2, 2, 2, 2];
  console.log(getMajority1(arr));
})();
