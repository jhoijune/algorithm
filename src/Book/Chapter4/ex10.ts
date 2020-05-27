import { createRandomArray } from '../../Util';
import { rotateArray1 } from '../Chapter1/rotateArray';

/*
In given rotated-sorted list of N integers. (The array was sorted then it was rotated some arbitrary
number of times.) If all the elements in the array were unique, find the index of some value.
*/

const ex10 = (arr: number[], value: number): number => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === value) {
      return mid;
    }
    if (arr[mid] > arr[low]) {
      if (arr[low] <= value && value < arr[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (arr[mid] < value && value <= arr[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }
  return -1;
};

(() => {
  const arr = createRandomArray(100, 100);
  arr.sort((a, b) => a - b);
  const rotated = rotateArray1(arr, 10);
  console.log(rotated);
  console.log(ex10(rotated, 50));
})();
