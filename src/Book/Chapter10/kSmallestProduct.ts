// Given an array of positive elements. Find product of k minimum elements in array.

import Heap from '../../DataStructure/Heap';

const kSmallestProduct1 = (arr: number[], k: number) => {
  // min heap ver
  const size = arr.length;
  if (!Number.isInteger(k) || k > size || k <= 0) {
    throw Error('k is invalid');
  }
  const heap = new Heap<number>();
  for (const value of arr) {
    heap.add(value, value);
  }
  let product = 1;
  for (let count = 0; count < k; count++) {
    const [value] = heap.remove();
    product *= value;
  }
  return product;
};

const kSmallestProduct2 = (arr: number[], k: number) => {
  // max heap ver
  const size = arr.length;
  if (!Number.isInteger(k) || k > size || k <= 0) {
    throw Error('k is invalid');
  }
  const heap = new Heap<number>(false);
  for (let index = 0; index < size; index++) {
    if (index >= k) {
      const [value] = heap.peek();
      if (value > arr[index]) {
        heap.remove();
        heap.add(arr[index], arr[index]);
      }
    } else {
      heap.add(arr[index], arr[index]);
    }
  }
  let product = 1;
  while (!heap.isEmpty()) {
    const [value] = heap.remove();
    product *= value;
  }
  return product;
};
