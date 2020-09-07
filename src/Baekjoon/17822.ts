import { readFileSync } from 'fs';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

let index = 0;

const [N, M, T] = input[index++]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const discs: number[][] = [];

for (; index <= N; index++) {
  discs.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const methods: [number, number, number][] = [];

for (; index <= N + T; index++) {
  methods.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v)) as [number, number, number]
  );
}

const solution = function (
  discs: number[][],
  methods: [number, number, number][]
) {
  const N = discs.length;
  const M = discs[0].length;
  const upper = new Array<number>(N).fill(0);
  let deleteLen = 0;
  const deleted = Array.from(Array(N), () => new Array<boolean>(M).fill(false));

  const _DFS = function (num: number, index: number, visited: boolean[][]) {
    deleteLen += 1;
    deleted[num][index] = true;
    if (
      !deleted[num][(index + 1) % M] &&
      !visited[num][(index + 1) % M] &&
      discs[num][index] === discs[num][(index + 1) % M]
    ) {
      visited[num][(index + 1) % M] = true;
      _DFS(num, (index + 1) % M, visited);
    }
    if (
      !deleted[num][(M + index - 1) % M] &&
      !visited[num][(M + index - 1) % M] &&
      discs[num][index] === discs[num][(M + index - 1) % M]
    ) {
      visited[num][(M + index - 1) % M] = true;
      _DFS(num, (M + index - 1) % M, visited);
    }
    if (num < N - 1) {
      for (let index2 = 0; index2 < M; index2++) {
        if (
          (upper[num] + index) % M === (upper[num + 1] + index2) % M &&
          !deleted[num + 1][index2] &&
          !visited[num + 1][index2] &&
          discs[num][index] === discs[num + 1][index2]
        ) {
          visited[num + 1][index2] = true;
          _DFS(num + 1, index2, visited);
        }
      }
    }
    if (num >= 1) {
      for (let index2 = 0; index2 < M; index2++) {
        if (
          (upper[num] + index) % M === (upper[num - 1] + index2) % M &&
          !deleted[num - 1][index2] &&
          !visited[num - 1][index2] &&
          discs[num][index] === discs[num - 1][index2]
        ) {
          visited[num - 1][index2] = true;
          _DFS(num - 1, index2, visited);
        }
      }
    }
  };

  const DFS = function (): boolean {
    const visited = Array.from(Array(N), () =>
      new Array<boolean>(M).fill(false)
    );
    let isChanged = false;
    for (let num = 0; num < N; num++) {
      for (let index = 0; index < M; index++) {
        if (!deleted[num][index] && !visited[num][index]) {
          visited[num][index] = true;
          if (
            !deleted[num][(index + 1) % M] &&
            !visited[num][(index + 1) % M] &&
            discs[num][index] === discs[num][(index + 1) % M]
          ) {
            isChanged = true;
            _DFS(num, index, visited);
          } else if (
            !deleted[num][(M + index - 1) % M] &&
            !visited[num][(M + index - 1) % M] &&
            discs[num][index] === discs[num][(M + index - 1) % M]
          ) {
            isChanged = true;
            _DFS(num, index, visited);
          } else if (num < N - 1) {
            for (let index2 = 0; index2 < M; index2++) {
              if (
                (upper[num] + index) % M === (upper[num + 1] + index2) % M &&
                !deleted[num + 1][index2] &&
                !visited[num + 1][index2] &&
                discs[num][index] === discs[num + 1][index2]
              ) {
                isChanged = true;
                _DFS(num, index, visited);
              }
            }
          } else if (num >= 1) {
            for (let index2 = 0; index2 < M; index2++) {
              if (
                (upper[num] + index) % M === (upper[num - 1] + index2) % M &&
                !deleted[num - 1][index2] &&
                !visited[num - 1][index2] &&
                discs[num][index] === discs[num - 1][index2]
              ) {
                isChanged = true;
                _DFS(num, index, visited);
              }
            }
          }
        }
      }
    }
    return isChanged;
  };

  const sumDiscs = function (): [number, number] {
    let sum = 0;
    let count = 0;
    for (let num = 0; num < N; num++) {
      for (let index = 0; index < M; index++) {
        if (!deleted[num][index]) {
          sum += discs[num][index];
          count += 1;
        }
      }
    }
    return [sum, count];
  };

  const exceptCase = function () {
    const [sum, count] = sumDiscs();
    const mean = sum / count;
    for (let num = 0; num < N; num++) {
      for (let index = 0; index < M; index++) {
        if (!deleted[num][index] && discs[num][index] > mean) {
          discs[num][index] -= 1;
        } else if (!deleted[num][index] && discs[num][index] < mean) {
          discs[num][index] += 1;
        }
      }
    }
  };

  for (const [num, direction, count] of methods) {
    const inc = direction === 0 ? count : -count;
    for (let index = num; index < N + 1; index += num) {
      upper[index - 1] = (M + upper[index - 1] + inc) % M;
    }
    if (deleteLen !== N * M) {
      const isChanged = DFS();
      if (!isChanged) {
        exceptCase();
      }
    }
  }

  const [sum] = sumDiscs();
  console.log(sum);
};

solution(discs, methods);
