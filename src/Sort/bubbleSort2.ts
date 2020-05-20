import { createRandomArray, swap } from '../Util';
import isSorted from './isSorted';

const bubbleSort2 = (arr: number[], isAscending: boolean = true): void => {
  const size = arr.length;
  for (let i = 0; i < size - 1; i++) {
    let isSwaped = false;
    for (let j = 0; j < size - i - 1; j++) {
      if (!isSorted(arr[j], arr[j + 1], isAscending)) {
        swap(arr, j, j + 1);
        isSwaped = true;
      }
    }
    if (!isSwaped) {
      break;
    }
  }
};

(() => {
  const arr = createRandomArray(10, 100);
  console.log(arr);
  bubbleSort2(arr);
  console.log(arr);
})();
