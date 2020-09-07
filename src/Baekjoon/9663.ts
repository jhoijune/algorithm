import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const n = Number(readFileSync(source).toString().trim());

let answer = 0;

const _util = function (numbers: number[], used: boolean[]) {
  const numbersLen = numbers.length;
  const usedLen = used.length;
  if (numbersLen === usedLen) {
    answer += 1;
    return;
  }
  for (let number = 0; number < usedLen; number++) {
    if (!used[number]) {
      let index = 0;
      while (
        index < numbersLen &&
        Math.abs(number - numbers[index]) !== numbersLen - index
      ) {
        index += 1;
      }
      if (index === numbersLen) {
        numbers.push(number);
        used[number] = true;
        _util(numbers, used);
        numbers.pop();
        used[number] = false;
      }
    }
  }
};

const solution = function (n: number) {
  const numbers: number[] = [];
  const used = new Array<boolean>(n).fill(false);
  for (let number = 0; number < n; number++) {
    numbers.push(number);
    used[number] = true;
    _util(numbers, used);
    numbers.pop();
    used[number] = false;
  }
  console.log(answer);
};

solution(n);
