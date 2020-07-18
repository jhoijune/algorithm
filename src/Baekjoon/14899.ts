import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');
const adj: number[][] = [];
for (let index = 1; index < input.length; index++) {
  adj.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = (adj: number[][]) => {
  const N = adj.length;
  let answer = Infinity;

  const sumCapacity = (arr: number[]): number => {
    let sum = 0;
    for (let i = 0; i < N / 2; i++) {
      for (let j = i + 1; j < N / 2; j++) {
        sum += adj[arr[i]][arr[j]] + adj[arr[j]][arr[i]];
      }
    }
    return sum;
  };

  for (let i = 0; i < 1 << N; i++) {
    const start: number[] = [];
    for (let j = 0; j < N; j++) {
      if (i & (1 << j)) {
        start.push(j);
      }
    }
    if (start.length !== N / 2) {
      continue;
    }
    const link: number[] = [...Array(N).keys()].filter(
      (v) => !start.includes(v)
    );
    const diff = Math.abs(sumCapacity(start) - sumCapacity(link));
    answer = Math.min(answer, diff);
  }
  console.log(answer);
};

solution(adj);
