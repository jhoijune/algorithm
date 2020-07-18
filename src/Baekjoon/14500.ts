import { createInterface } from 'readline';
import { create } from 'lodash';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (board: number[][]) => {
  const N = board.length;
  const M = board[0].length;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  let answer = -Infinity;
  const used = Array.from(Array(N), () => new Array<boolean>(M).fill(false));

  const dfs = (row: number, col: number, sum: number, count: number) => {
    if (count === 4) {
      answer = Math.max(answer, sum);
      return;
    }
    for (let dir = 0; dir < 4; dir++) {
      const nr = row + dr[dir];
      const nc = col + dc[dir];
      if (nr >= 0 && nr < N && nc >= 0 && nc < M && !used[nr][nc]) {
        used[nr][nc] = true;
        dfs(nr, nc, sum + board[nr][nc], count + 1);
        used[nr][nc] = false;
      }
    }
  };

  const shape1 = (row: number, col: number) => {
    // ㅗ
    if (col + 2 < M && row - 1 >= 0) {
      const sum =
        board[row][col] +
        board[row][col + 1] +
        board[row][col + 2] +
        board[row - 1][col + 1];
      answer = Math.max(answer, sum);
    }
  };

  const shape2 = (row: number, col: number) => {
    // ㅏ
    if (row + 2 < N && col + 1 < M) {
      const sum =
        board[row][col] +
        board[row + 1][col] +
        board[row + 2][col] +
        board[row + 1][col + 1];
      answer = Math.max(answer, sum);
    }
  };

  const shape3 = (row: number, col: number) => {
    // ㅜ
    if (row + 1 < N && col + 2 < M) {
      const sum =
        board[row][col] +
        board[row][col + 1] +
        board[row][col + 2] +
        board[row + 1][col + 1];
      answer = Math.max(answer, sum);
    }
  };

  const shape4 = (row: number, col: number) => {
    // ㅓ
    if (col + 1 < M && row - 1 >= 0 && row + 1 < N) {
      const sum =
        board[row][col] +
        board[row][col + 1] +
        board[row - 1][col + 1] +
        board[row + 1][col + 1];
      answer = Math.max(answer, sum);
    }
  };

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      used[row][col] = true;
      dfs(row, col, board[row][col], 1);
      used[row][col] = false;
      shape1(row, col);
      shape2(row, col);
      shape3(row, col);
      shape4(row, col);
    }
  }
  console.log(answer);
};

let N: number;
const board: number[][] = [];

rl.on('line', (line) => {
  if (typeof N === 'undefined') {
    N = Number(line);
  } else {
    board.push(line.split(' ').map((v) => Number(v)));
    if (board.length === N) {
      rl.close();
    }
  }
}).on('close', () => {
  solution(board);
  process.exit();
});
