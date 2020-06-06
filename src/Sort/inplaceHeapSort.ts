import { swap, createRandomArray } from '../Util';
import isSorted from './isSorted';

const inplaceHeapSort = (arr: number[], isAscending: boolean = true) => {
  const downheap = (index: number, size: number) => {
    const left = 2 * index + 1;
    if (left < size) {
      let selected = left;
      const right = 2 * index + 2;
      if (right < size) {
        if (isSorted(arr[left], arr[right], isAscending)) {
          selected = right;
        }
      }
      if (isSorted(arr[index], arr[selected], isAscending)) {
        swap(arr, index, selected);
        downheap(selected, size);
      }
    }
  };
  const size = arr.length;
  const start = Math.floor((size - 2) / 2);
  for (let index = start; index >= 0; index--) {
    downheap(index, size);
  }
  for (let index = size - 1; index > 0; index--) {
    swap(arr, 0, index);
    downheap(0, index);
  }
};

(() => {
  const arr = createRandomArray(20, 100);
  console.log(arr);
  inplaceHeapSort(arr);
  console.log(arr);
})();
