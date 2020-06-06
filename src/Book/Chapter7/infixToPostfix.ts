const precedence = (operator: string): number => {
  if (operator === '(') {
    return 0;
  } else if (operator === '+' || operator === '-') {
    return 1;
  } else if (operator === '*' || operator === '/' || operator === '%') {
    return 2;
  } else if (operator === '^') {
    return 3;
  }
  return 4;
};

const infixToPostfix = (expn: string): string => {
  const size = expn.length;
  const stack: string[] = [];
  let output = '';
  for (let index = 0; index < size; index++) {
    const char = expn[index];
    if (char <= '9' && char >= '0') {
      output += `${char} `;
    } else {
      switch (char) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case '^':
          while (
            stack.length !== 0 &&
            precedence(char) <= precedence(stack[stack.length - 1])
          ) {
            output += `${stack.pop()} `;
          }
          stack.push(char);
          break;
        case '(':
          stack.push(char);
          break;
        case ')':
          while (stack.length !== 0 && stack[stack.length - 1] !== '(') {
            output += `${stack.pop()} `;
          }
          stack.pop();
          break;
      }
    }
  }
  while (stack.length !== 0) {
    output += `${stack.pop()} `;
  }
  return output;
};

(() => {
  console.log(infixToPostfix('10+((3))*5/(16-4)'));
})();
