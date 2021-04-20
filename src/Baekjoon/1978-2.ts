import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const numbers = readFileSync(source)
  .toString()
  .trim()
  .split('\n')[1]
  .split(' ')
  .map((v) => Number(v.trim()));

const solution = function (numbers: number[], limit: number) {
  const isPrime = new Array<boolean>(limit).fill(true);
  isPrime[1 - 1] = false;
  for (let num = 2; num <= limit; num++) {
    if (!isPrime[num - 1]) {
      continue;
    }
    for (let curr = num + num; curr <= limit; curr += num) {
      isPrime[curr - 1] = false;
    }
  }
  let count = 0;
  for (const number of numbers) {
    count += isPrime[number - 1] ? 1 : 0;
  }
  console.log(count);
};

solution(numbers, 1000);
