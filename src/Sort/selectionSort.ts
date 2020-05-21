import { swap, createRandomArray } from '../Util';
import isSorted from './isSorted';

const selectionSort = (arr: number[], isAscending: boolean = true) => {
  const size = arr.length;
  for (let i = 0; i < size - 1; i++) {
    let currentIndex = i;
    for (let j = i + 1; j < size; j++) {
      if (!isSorted(arr[currentIndex], arr[j], isAscending)) {
        currentIndex = j;
      }
    }
    swap(arr, i, currentIndex);
  }
};

(() => {
  const arr = createRandomArray(10, 100);
  console.log(arr);
  selectionSort(arr);
  console.log(arr);
})();
