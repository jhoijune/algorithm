import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const RGB: [number, number, number][] = [];
for (let index = 1; index < input.length; index++) {
  RGB.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v)) as [number, number, number]
  );
}

const solution = function (RGB: [number, number, number][]) {
  const size = RGB.length;
  let answer = Infinity;
  for (let start = 0; start < 3; start++) {
    const dp = Array.from(Array(size), () =>
      new Array<number>(3).fill(Infinity)
    );
    dp[0][start] = RGB[0][start];
    for (let num = 1; num < size; num++) {
      for (let index = 0; index < 3; index++) {
        dp[num][index] =
          Math.min(dp[num - 1][(index + 1) % 3], dp[num - 1][(index + 2) % 3]) +
          RGB[num][index];
      }
    }
    answer = Math.min(
      answer,
      dp[size - 1][(start + 1) % 3],
      dp[size - 1][(start + 2) % 3]
    );
  }
  console.log(answer);
};

solution(RGB);
