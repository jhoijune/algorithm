/*
Given an array of size N, which contain integers from 1 to N. Elements can appear any
number of times. Print frequency of all elements in the array also print the missing elements frequency
as 0
*/

const frequencyCounts1 = (arr: number[]) => {
  const size = arr.length;
  const ht: Map<number, number> = new Map();
  for (const value of arr) {
    if (ht.has(value)) {
      const exCount = ht.get(value)!;
      ht.set(value, exCount + 1);
    } else {
      ht.set(value, 1);
    }
  }
  for (let num = 1; num <= size; num++) {
    let count = 0;
    if (ht.has(num)) {
      count = ht.get(num)!;
    }
    console.log(`${num} : ${count}`);
  }
};

const frequencyCounts2 = (arr: number[]) => {
  const size = arr.length;
  for (let index = 0; index < size; index++) {
    while (arr[index] > 0) {
      const matchedIndex = arr[index] - 1;
      if (arr[matchedIndex] < 0) {
        arr[matchedIndex] -= 1;
        arr[index] = 0;
      } else {
        arr[index] = arr[matchedIndex];
        arr[matchedIndex] = -1;
      }
    }
  }
  for (let index = 0; index < size; index++) {
    console.log(`${index + 1} : ${Math.abs(arr[index])}`);
  }
};
