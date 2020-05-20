import { swap, createRandomArray } from '../Util';
import isSorted from './isSorted';

const bubbleSort = (arr: number[], isAscending: boolean = true): void => {
  const size = arr.length;
  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      if (!isSorted(arr[j], arr[j + 1], isAscending)) {
        swap(arr, j, j + 1);
      }
    }
  }
};

(() => {
  const arr = createRandomArray(20, 100);
  console.log(arr);
  bubbleSort(arr);
  console.log(arr);
})();

export default bubbleSort;
export { bubbleSort };
