// Given a stack, reverse its elements

import Stack from '../../DataStructure/Stack';
import bottomInsert from './bottomInsert';

const reverseStackUtil = <T>(stack: Stack<T>, element: T) => {
  if (stack.isEmpty()) {
    stack.push(element);
  } else {
    const top = stack.pop();
    reverseStackUtil(stack, element);
    stack.push(top);
  }
};

const reverseStack = <T>(stack: Stack<T>) => {
  if (stack.isEmpty()) {
    return;
  }
  const top = stack.pop();
  reverseStack(stack);
  bottomInsert(stack, top);
};
