import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [N, M, K] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const nutrientInput: number[][] = [];
for (let index = 1; index <= N; index++) {
  nutrientInput.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}
const treeInfo: number[][] = [];
for (let index = N + 1; index < input.length; index++) {
  treeInfo.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = function (
  limit: number,
  input: number[][],
  infos: number[][]
) {
  const N = input.length;
  const nutrient = Array.from(Array(N), () => new Array<number>(N).fill(5));
  const trees: number[][][] = Array.from(Array(N), () =>
    Array.from(Array(N), () => [])
  );
  for (const [row, col, year] of infos) {
    trees[row - 1][col - 1].push(year);
  }

  const springAndSummer = function () {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        const newTrees: number[] = [];
        let deadInput = 0;
        trees[row][col].sort((a, b) => a - b);
        for (const tree of trees[row][col]) {
          if (nutrient[row][col] - tree >= 0) {
            nutrient[row][col] -= tree;
            newTrees.push(tree + 1);
          } else {
            deadInput += Math.floor(tree / 2);
          }
        }
        nutrient[row][col] += deadInput;
        trees[row][col] = newTrees;
      }
    }
  };

  const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
  const dc = [0, 1, 1, 1, 0, -1, -1, -1];

  const fall = function () {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        for (const tree of trees[row][col]) {
          if (tree % 5 === 0) {
            for (let dir = 0; dir < 8; dir++) {
              const nr = row + dr[dir];
              const nc = col + dc[dir];
              if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
                trees[nr][nc].push(1);
              }
            }
          }
        }
      }
    }
  };

  const winter = function () {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        nutrient[row][col] += input[row][col];
      }
    }
  };

  let year = 0;
  while (year !== limit) {
    springAndSummer();
    fall();
    winter();
    year += 1;
  }

  const scanTree = function (): number {
    let answer = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        answer += trees[row][col].length;
      }
    }
    return answer;
  };

  console.log(scanTree());
};

solution(K, nutrientInput, treeInfo);
