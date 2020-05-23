/*
Element left after reductions. Given an array of positive elements. You need to perform
reduction operation. In each reduction operation smallest positive element value is picked and all the
elements are subtracted by that value. You need to print the number of elements left after each
reduction process.
Input: [5, 1, 1, 1, 2, 3, 5]
Output:
4 corresponds to [4, 1, 2, 4]
3 corresponds to [3, 1, 3]
2 corresponds to [2, 2]
0 corresponds to [0]
*/

import { createRandomArray } from '../../Util';

const arrayReduction = (arr: number[]) => {
  const size = arr.length;
  arr.sort((a, b) => a - b);
  let minValue = arr[0];
  for (let index = 0; index < size; index++) {
    if (arr[index] > minValue) {
      console.log(size - index);
      minValue = arr[index];
    }
  }
};

(() => {
  const arr = createRandomArray(20, 10);
  console.log(arr);
  arrayReduction(arr);
})();
