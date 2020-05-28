import _ from 'lodash';

import { createRandomArray } from '../../Util';
import { rotateArray1 } from '../Chapter1/rotateArray';

// Find max in sorted rotated list.

const ex08 = (arr: number[]) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (mid === size - 1 || arr[mid] > arr[mid + 1]) {
      console.log(arr[mid]);
      return mid;
    }
    if (arr[low] <= arr[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
};

(() => {
  const arr = createRandomArray(20, 100);
  arr.sort((a, b) => a - b);
  const rotated = rotateArray1(arr, _.random(20));
  console.log(rotated);
  ex08(rotated);
})();
