import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [N, , K] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const board: string[][] = [];
for (let index = 1; index < N + 1; index++) {
  board.push(input[index].trim().split(''));
}
const target = input[N + 1];

const solution = (board: string[][], K: number, target: string) => {
  const N = board.length;
  const M = board[0].length;
  let answer = 0;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  const table = Array.from(Array(N), () =>
    Array.from(Array(M), () => new Array<number>(target.length).fill(-1))
  );

  const dfs = (row: number, col: number, index: number) => {
    if (index === target.length) {
      return 1;
    }
    if (table[row][col][index] !== -1) {
      return table[row][col][index];
    }
    table[row][col][index] = 0;
    for (let direction = 0; direction < 4; direction++) {
      for (let length = 1; length <= K; length++) {
        const nr = row + dr[direction] * length;
        const nc = col + dc[direction] * length;
        if (nr < 0 || nr >= N || nc < 0 || nc >= M) {
          continue;
        }
        if (board[nr][nc] !== target[index]) {
          continue;
        }
        const temp = dfs(nr, nc, index + 1);
        table[row][col][index] = table[row][col][index] + temp;
      }
    }
    return table[row][col][index];
  };

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (board[row][col] === target[0]) {
        answer += dfs(row, col, 1);
      }
    }
  }
  console.log(answer);
};

solution(board, K, target);
