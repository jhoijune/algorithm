import { readFileSync } from 'fs';

const solution = function (board: boolean[][]) {
  const M = board[0].length;
  const N = board.length;
  const visited = Array.from(Array(N), () => new Array<boolean>(M).fill(false));
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const DFS = function (row: number, col: number) {
    if (
      row < 0 ||
      row >= N ||
      col < 0 ||
      col >= M ||
      !board[row][col] ||
      visited[row][col]
    ) {
      return;
    }
    visited[row][col] = true;
    for (let dir = 0; dir < 4; dir++) {
      DFS(row + dr[dir], col + dc[dir]);
    }
  };

  let answer = 0;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (!board[row][col] || visited[row][col]) {
        continue;
      }
      answer += 1;
      DFS(row, col);
    }
  }
  console.log(answer);
};

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const cases = Number(input[0].trim());
let index = 1;
for (let num = 1; num <= cases; num++) {
  const [M, N, count] = input[index++]
    .trim()
    .split(' ')
    .map((v) => Number(v));
  const board = Array.from(Array(N), () => new Array<boolean>(M).fill(false));
  for (let curr = 0; curr < count; curr++) {
    const [col, row] = input[index++]
      .trim()
      .split(' ')
      .map((v) => Number(v));
    board[row][col] = true;
  }
  solution(board);
}
