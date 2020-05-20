import { createRandomArray } from '../Util';
import isSorted from './isSorted';

const insertionSort = (arr: number[], isAscending: boolean = true) => {
  const size = arr.length;
  for (let i = 1; i < size; i++) {
    const temp = arr[i];
    let j = i;
    while (j > 0 && isSorted(temp, arr[j - 1], isAscending)) {
      // j 위치의 원소를 판별하는 과정
      arr[j] = arr[j - 1];
      j -= 1;
    }
    arr[j] = temp;
  }
};

(() => {
  const arr = createRandomArray(10, 100);
  console.log(arr);
  insertionSort(arr);
  console.log(arr);
})();
