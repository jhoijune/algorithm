import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');
const nums = input[1]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const [B, C] = input[2]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = (nums: number[], B: number, C: number) => {
  let answer = 0;
  for (let num of nums) {
    num -= B;
    if (num > 0) {
      answer += Math.ceil(num / C) + 1;
    } else {
      answer += 1;
    }
  }
  console.log(answer);
};

solution(nums, B, C);
