import _ from 'lodash';
import { createRandomArray } from '../Util';

const bucketSort = (arr: number[], min: number, max: number) => {
  const aux: number[] = new Array(max - min + 1).fill(0);
  for (const num of arr) {
    aux[num - min] += 1;
  }
  const size = aux.length;
  let insertIndex = 0;
  for (let index = 0; index < size; index++) {
    for (let count = aux[index]; count > 0; count--) {
      arr[insertIndex++] = min + index;
    }
  }
};

(() => {
  const arr = createRandomArray(10, 100);
  console.log(arr);
  bucketSort(arr, 0, 100);
  console.log(arr);
})();
