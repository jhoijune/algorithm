import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [N, target] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const numbers = input[1]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = function (numbers: number[], target: number) {
  const size = numbers.length;
  let answer = 0;
  for (let i = 1; i < 1 << size; i++) {
    let sum = 0;
    for (let j = 0; j < size; j++) {
      if (i & (1 << j)) {
        sum += numbers[j];
      }
    }
    if (sum === target) {
      answer += 1;
    }
  }
  console.log(answer);
};

solution(numbers, target);
