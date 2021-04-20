import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const numbers = readFileSync(source)
  .toString()
  .trim()
  .split('\n')[1]
  .split(' ')
  .map((v) => Number(v.trim()));

const solution = function (number: number): boolean {
  if (number === 1) {
    return false;
  } else if (number === 2 || number === 3) {
    return true;
  }
  for (let div = 2; div * div <= number; div++) {
    if (number % div === 0) {
      return false;
    }
  }
  return true;
};

let count = 0;
for (const number of numbers) {
  if (solution(number)) {
    count += 1;
  }
}

console.log(count);
