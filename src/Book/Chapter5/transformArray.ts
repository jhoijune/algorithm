/*
How would you swap elements of an array like [a1 a2 a3 a4 b1 b2 b3 b4] to convert it into [a1
b1 a2 b2 a3 b3 a4 b4]?
*/

import { swap } from '../../Util';

const transformArray = (arr: number[]) => {
  const size = arr.length;
  const N = Math.floor((size - 1) / 2);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i + 1; j++) {
      swap(arr, N - i + 2 * j, N - i + 2 * j + 1);
    }
  }
};

(() => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  transformArray(arr);
  console.log(arr);
})();
