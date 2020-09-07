import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

let index = 0;

const N = Number(input[index++].trim());
const populations = input[index++]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const connections: number[][] = [];
for (; index <= N + 1; index++) {
  connections.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = function (populations: number[], connections: number[][]) {
  const size = populations.length;
  let answer = -1;
  const sum = populations.reduce((prev, curr) => prev + curr, 0);

  const _check = function (src: number, visited: boolean[], set: Set<number>) {
    visited[src - 1] = true;
    for (let index = 1; index <= connections[src - 1][0]; index++) {
      const dst = connections[src - 1][index];
      if (!visited[dst - 1] && set.has(dst)) {
        _check(dst, visited, set);
      }
    }
  };

  const checkConnection = function (district: number[]): boolean {
    const visited = new Array(size).fill(false);
    const set = new Set<number>(district);
    _check(district[0], visited, set);
    for (let index = 0; index < size; index++) {
      if (set.has(index + 1) && !visited[index]) {
        return false;
      }
    }
    return true;
  };

  for (let i = 0; i < 1 << size; i++) {
    const district1: number[] = [];
    const district2: number[] = [];
    for (let j = 0; j < size; j++) {
      if (i & (1 << j)) {
        district1.push(j + 1);
      } else {
        district2.push(j + 1);
      }
    }
    if (district1.length === 0 || district2.length === 0) {
      continue;
    }
    if (!checkConnection(district1) || !checkConnection(district2)) {
      continue;
    }
    let district1Sum = 0;
    for (const num of district1) {
      district1Sum += populations[num - 1];
    }
    const district2Sum = sum - district1Sum;
    const curr = Math.abs(district1Sum - district2Sum);
    if (answer === -1 || curr < answer) {
      answer = curr;
    }
  }
  console.log(answer);
};

solution(populations, connections);
