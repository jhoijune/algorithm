import Stack from '../../DataStructure/Stack';
import ArrayStack from '../../DataStructure/ArrayStack';

/*
Given a stack whose elements are sorted, write a function which will insert elements in sorted
order. With highest at the top and lowest at the bottom.
*/

const sortedInsert = (stack: Stack<number>, element: number) => {
  if (stack.isEmpty() || element > stack.top()) {
    stack.push(element);
  } else {
    const top = stack.pop();
    sortedInsert(stack, element);
    stack.push(top);
  }
};

(() => {
  const stk = new ArrayStack<number>();
  stk.push(1).push(2).push(3).push(4).push(5);
  sortedInsert(stk, 3);
  stk.print();
})();
