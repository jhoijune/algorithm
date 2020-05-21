import { createRandomArray } from '../Util';

const quickSort = (arr: number[]) => {
  const size = arr.length;
  if (size < 2) {
    return;
  }
  const less: number[] = [];
  const equal: number[] = [];
  const greater: number[] = [];
  const [value] = arr;
  equal.push(value);
  for (let index = 1; index < size; index++) {
    const temp = arr[index];
    if (temp < value) {
      less.push(temp);
    } else if (temp === value) {
      equal.push(temp);
    } else {
      greater.push(temp);
    }
  }
  quickSort(less);
  quickSort(greater);
  const lessSize = less.length;
  const equalSize = equal.length;
  const greaterSize = greater.length;
  let insertIndex = 0;
  for (let index = 0; index < lessSize; index++) {
    arr[insertIndex++] = less[index];
  }
  for (let index = 0; index < equalSize; index++) {
    arr[insertIndex++] = equal[index];
  }
  for (let index = 0; index < greaterSize; index++) {
    arr[insertIndex++] = greater[index];
  }
};

(() => {
  const arr = createRandomArray(10, 100);
  console.log(arr);
  quickSort(arr);
  console.log(arr);
})();
