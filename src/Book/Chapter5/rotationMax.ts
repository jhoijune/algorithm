import { createRandomArray } from '../../Util';
import { rotateArray1 } from '../Chapter1/rotateArray';

/*
Given a sorted list S of N integer. S is rotated an unknown number of times. Find largest
element in the array.
*/

const rotationMax = (arr: number[]) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] > arr[mid + 1]) {
      return mid;
    }
    if (arr[low] <= arr[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return high;
};

export default rotationMax;
