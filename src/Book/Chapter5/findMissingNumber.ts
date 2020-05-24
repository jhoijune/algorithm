import _ from 'lodash';

/*
In given list of n-1 elements, which are in the range of 1 to n. There are no duplicates in the
array. One of the integers is missing. Find the missing element
*/

const findMissingNumber1 = (arr: number[]) => {
  const size = arr.length;
  for (let value = 1; value <= size + 1; value++) {
    let found = false;
    for (let index = 0; index < size; index++) {
      if (arr[index] === value) {
        found = true;
        break;
      }
    }
    if (!found) {
      return value;
    }
  }
};

const findMissingNumber2 = (arr: number[]) => {
  // time complexity O(nlogn)
  // space complexity O(n)
  const sorted = [...arr].sort((a, b) => a - b);
  const size = sorted.length;
  for (let index = 0; index < size; index++) {
    if (sorted[index] !== index + 1) {
      return index + 1;
    }
  }
};

const findMissingNumber3 = (arr: number[]) => {
  const size = arr.length;
  const ht: Map<number, number> = new Map();
  for (const value of arr) {
    ht.set(value, 1);
  }
  for (let value = 1; value <= size + 1; value++) {
    if (!ht.has(value)) {
      return value;
    }
  }
};

const findMissingNumber4 = (arr: number[]) => {
  const size = arr.length;
  let sum = _.range(1, size + 1).reduce((prev, current) => prev + current, 0);
  for (const value of arr) {
    sum -= value;
  }
  return sum;
};

(() => {
  const first = [1, 3, 5, 7, 2, 4, 8, 9, 10];
  console.log(findMissingNumber2(first));
})();
