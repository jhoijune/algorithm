/*
Given an array of integer, find first negative of all the values in the sliding windows of length k.
Input:
Arr = [13, -2, -6, 10, -14, 50, 14, 21]
k=3
Output: [-2, -2, -6, -14, -14, NAN]
*/

import { ArrayQueue } from '../../DataStructure';

const firstNegativeSlidingWindows = (arr: number[], k: number) => {
  const size = arr.length;
  const queue = new ArrayQueue<number>();
  for (let index = 0; index < size; index++) {
    if (!queue.isEmpty() && queue.first()! <= index - k) {
      queue.dequeue();
    }
    if (arr[index] < 0) {
      queue.enqueue(index);
    }
    if (index >= k - 1) {
      console.log(`${queue.isEmpty() ? 'NaN' : arr[queue.first()!]} `);
    }
  }
};

(() => {
  const arr = [13, -2, -6, 10, -14, 50, 14, 21];
  firstNegativeSlidingWindows(arr, 3);
})();
