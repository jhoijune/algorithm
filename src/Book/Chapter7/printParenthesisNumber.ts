/*
Given an expression, Number each parenthe?is pair such that for each pair the opening and
closing parenthesis have same number.
Example :
Input: '(((a+(b))+(c+d)))'
Output: [1, 2, 3, 4, 4, 3, 5, 5, 2, 1]
*/

const printParenthesisNumber = (expn: string): number[] => {
  const size = expn.length;
  const stack: number[] = [];
  const output: number[] = [];
  let number = 0;
  for (let index = 0; index < size; index++) {
    if (expn[index] === '(') {
      number += 1;
      stack.push(number);
      output.push(number);
    } else if (expn[index] === ')') {
      const top = stack.pop()!;
      output.push(top);
    }
  }
  return output;
};

(() => {
  console.log('hello world');
  console.log(printParenthesisNumber('(((a+(b))+(c+d)))'));
})();
