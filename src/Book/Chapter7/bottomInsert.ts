// Given stack write a function to insert element at the bottom of the stack.

import Stack from '../../DataStructure/Stack';

const bottomInsert = <T>(stack: Stack<T>, element: T) => {
  if (stack.isEmpty()) {
    stack.push(element);
  } else {
    const top = stack.pop();
    bottomInsert(stack, element);
    stack.push(top);
  }
};

export default bottomInsert;
