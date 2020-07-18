import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const solution = (str: string, explosion: string) => {
  const expSize = explosion.length;
  let stack: string[] = str.split('');
  while (true) {
    const newStack: string[] = [];
    for (const char of stack) {
      newStack.push(char);
      if (char === explosion[expSize - 1] && newStack.length >= expSize) {
        const size = newStack.length;
        let matched = 1;
        while (
          matched < expSize &&
          newStack[size - matched - 1] === explosion[expSize - matched - 1]
        ) {
          matched += 1;
        }
        if (matched === expSize) {
          for (let _ = 0; _ < expSize; _++) {
            newStack.pop();
          }
        }
      }
    }
    if (stack.length === newStack.length) {
      break;
    }
    stack = newStack;
  }
  console.log(stack.length !== 0 ? stack.join('') : 'FRULA');
};

solution(input[0].trim(), input[1].trim());
