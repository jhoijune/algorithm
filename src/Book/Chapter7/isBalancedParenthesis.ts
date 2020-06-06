/*
Write a program to check balanced symbols (such as {}, (), []). The closing symbol should be
matched with the most recently seen opening symbol.
e.g. {()} is legal, {()({})} is legal, but {((} and {(}) are not legal
*/

import ArrayStack from '../../DataStructure/ArrayStack';

const opening = ['{', '(', '['];
const closing = ['}', ')', ']'];

const isBalancedParenthesis = (expn: string): boolean => {
  const symbols = expn.split('');
  const stack = new ArrayStack<string>();
  for (const symbol of symbols) {
    if (opening.includes(symbol)) {
      stack.push(symbol);
    } else {
      const index = closing.indexOf(symbol);
      if (index === -1) {
        throw Error('invalid input');
      }
      const top = stack.pop();
      if (top !== opening[index]) {
        return false;
      }
    }
  }
  return stack.isEmpty();
};

(() => {
  console.log(isBalancedParenthesis('{((}'));
})();
