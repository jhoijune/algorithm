/*
Write a function to evaluate a postfix expression. Such as: expression "1 2 + 3 4 + *" gives
output 21
*/

const postfixEvaluate = (expn: string): number => {
  const stack: number[] = [];
  for (const char of expn) {
    if (char === ' ') {
      continue;
    } else if (char <= '9' && char >= '0') {
      stack.push(parseInt(char));
    } else {
      const num2 = stack.pop()!;
      const num1 = stack.pop()!;
      switch (char) {
        case '+': {
          stack.push(num1 + num2);
          break;
        }
        case '-': {
          stack.push(num1 - num2);
          break;
        }
        case '*': {
          stack.push(num1 * num2);
          break;
        }
        case '/': {
          stack.push(num1 * num2);
          break;
        }
      }
    }
  }
  return stack.pop()!;
};

(() => {
  console.log(postfixEvaluate('6 5 2 3 + 8 * + 3 + *'));
})();
