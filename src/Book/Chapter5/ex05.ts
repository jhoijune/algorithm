// In given list of 0's, 1's and 2's, write a program to separate O's, 1's and 2's
import { swap, createRandomArray } from '../../Util';

const ex05 = (arr: number[]) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  let index = 0;
  while (index <= high) {
    if (arr[index] === 0) {
      swap(arr, index++, low++);
    } else if (arr[index] === 2) {
      swap(arr, index, high--);
    } else {
      index++;
    }
  }
};

(() => {
  const arr = createRandomArray(100, 2);
  ex05(arr);
  console.log(arr);
})();
