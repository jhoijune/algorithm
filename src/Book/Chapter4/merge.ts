/*
Given two sorted arrays. Sort the elements of these arrays so that first half of sorted elements
will lie in first array and second half lies in second array. Extra space allowed is O(1).
*/

import { createRandomArray } from '../../Util';

const merge = (arr1: number[], arr2: number[]) => {
  const size1 = arr1.length;
  const size2 = arr2.length;
  let index = 0;
  while (index < size1) {
    if (arr1[index] <= arr2[0]) {
      index += 1;
    } else {
      const temp = arr1[index];
      arr1[index] = arr2[0];
      for (let j = 1; j < size2; j++) {
        if (arr2[j] < temp) {
          arr2[j - 1] = arr2[j];
        } else {
          arr2[j - 1] = temp;
          break;
        }
      }
    }
  }
};

(() => {
  const arr1 = createRandomArray(5, 20);
  const arr2 = createRandomArray(10, 20);
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  console.log(arr1, arr2);
  merge(arr1, arr2);
  console.log(arr1, arr2);
})();
