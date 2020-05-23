import { createRandomArray } from '../../Util';
import { rotateArray1 } from '../Chapter1/rotateArray';

/*
In given rotated-sorted list of N integers. (The array was sorted then it was rotated some arbitrary
number of times.) If all the elements in the array were unique, find the index of some value.
*/

const correctIndex = (index: number, size: number, startIndex: number) => {
  return (index + startIndex) % size;
};

const modifiedBinarySearch = (
  arr: number[],
  value: number,
  startIndex: number
): number => {
  const size = arr.length;
  let left = 0;
  let right = size - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const correctedMid = correctIndex(mid, size, startIndex);
    if (arr[correctedMid] > value) {
      right = mid - 1;
    } else if (arr[correctedMid] < value) {
      left = mid + 1;
    } else {
      return correctedMid;
    }
  }
  return -1;
};

const ex10 = (arr: number[], value: number): number => {
  const size = arr.length;
  let startIndex = 0;
  for (let index = 1; index < size; index++) {
    if (arr[index - 1] > arr[index]) {
      startIndex = index;
      break;
    }
  }
  console.log(`start index: ${startIndex}`);
  return modifiedBinarySearch(arr, value, startIndex);
};

(() => {
  const arr = createRandomArray(100, 100);
  arr.sort((a, b) => a - b);
  const rotated = rotateArray1(arr, 10);
  console.log(rotated);
  console.log(ex10(rotated, 50));
})();
