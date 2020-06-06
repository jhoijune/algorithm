/*
Given an array of integer, find maximum value in all the sliding windows of length k.
Input: 11, 2, 75, 92, 59, 90, 55 and k = 3
Output: 75, 92, 92, 92, 90
*/

import ArrayDeque from '../../DataStructure/ArrayDeque';

const maxSlidingWindows = (arr: number[], k: number) => {
  const size = arr.length;
  const deque = new ArrayDeque<number>();
  for (let index = 0; index < size; index++) {
    if (!deque.isEmpty() && deque.first()! <= index - k) {
      deque.deleteFirst();
    }
    while (!deque.isEmpty() && arr[deque.last()!] <= arr[index]) {
      deque.deleteLast();
    }
    deque.addLast(index);
    if (index >= k - 1) {
      console.log(deque.first());
    }
  }
};
