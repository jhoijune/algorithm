// Given a stack, sort elements such that largest value is at the top.

import Stack from '../../DataStructure/Stack';
import ArrayStack from '../../DataStructure/ArrayStack';

const sortStack1 = (stack: Stack<number>) => {
  // time complexity O(nlogn)
  // space complexity O(n)
  const arr: number[] = [];
  while (!stack.isEmpty()) {
    arr.push(stack.pop());
  }
  arr.sort((a, b) => a - b);
  for (const value of arr) {
    stack.push(value);
  }
};

const sortStack2 = (stack: Stack<number>) => {
  const stack2 = new ArrayStack<number>();
  while (!stack.isEmpty()) {
    const top = stack.pop();
    while (!stack2.isEmpty() && stack2.top() < top) {
      stack.push(stack2.pop());
    }
    stack2.push(top);
  }
  while (!stack2.isEmpty()) {
    stack.push(stack2.pop());
  }
};
