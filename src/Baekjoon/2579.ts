import { readFileSync } from 'fs';

const source = __dirname + '/input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const scores = input.slice(1).map((v) => parseInt(v));

const solution = function (scores: number[]) {
  const size = scores.length;
  const dp = new Array<number>(size).fill(0);
  dp[0] = scores[0];
  if (size >= 2) {
    dp[1] = scores[0] + scores[1];
  }
  if (size >= 3) {
    dp[2] = Math.max(scores[0], scores[1]) + scores[2];
  }
  for (let index = 3; index < size; index++) {
    dp[index] =
      Math.max(dp[index - 2], dp[index - 3] + scores[index - 1]) +
      scores[index];
  }
  console.log(dp[size - 1]);
};

solution(scores);
