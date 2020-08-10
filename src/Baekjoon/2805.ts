import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [, M] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const heights = input[1]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = (heights: number[], M: number) => {
  let low = 0;
  let high = Math.max(...heights);
  let answer = 0;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let curr = BigInt(0);
    for (const height of heights) {
      if (height > mid) {
        curr = BigInt(curr) + BigInt(height - mid);
      }
    }
    if (curr >= M) {
      if (answer < mid) {
        answer = mid;
      }
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  console.log(answer);
};

solution(heights, M);
