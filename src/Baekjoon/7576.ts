import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: number[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = function (board: number[][]) {
  const N = board.length;
  const M = board[0].length;
  const RIPE = 1;
  const RAW = 0;
  const EMPTY = -1;

  const check = function (): boolean {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        if (board[row][col] === RAW) {
          return false;
        }
      }
    }
    return true;
  };

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const spread = function (row: number, col: number) {
    let changed = false;
    for (let dir = 0; dir < 4; dir++) {
      const nr = row + dr[dir];
      const nc = col + dc[dir];
      if (nr >= 0 && nr < N && nc >= 0 && nc < M && board[nr][nc] === RAW) {
        board[nr][nc] = RIPE;
        changed = true;
      }
    }
    return changed;
  };

  let time = 0;
  while (true) {
    if (check()) {
      break;
    }
    const ripeList: [number, number][] = [];
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        if (board[row][col] === RIPE) {
          ripeList.push([row, col]);
        }
      }
    }
    let changed = false;
    for (const [row, col] of ripeList) {
      if (spread(row, col)) {
        changed = true;
      }
    }
    if (!changed) {
      time = -1;
      break;
    }
    time += 1;
  }
  console.log(time);
};

solution(board);
