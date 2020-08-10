import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [, , T] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const board: number[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = (board: number[][], T: number) => {
  const R = board.length;
  const C = board[0].length;

  const purifier: [number, number][] = [];

  for (let row = 0; row < R; row++) {
    if (board[row][0] === -1) {
      purifier.push([row, 0]);
    }
  }

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const spread = () => {
    const spreaded = Array.from(Array(R), () => new Array<number>(C).fill(0));
    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        if (board[row][col] > 0) {
          let count = 0;
          const insert = Math.floor(board[row][col] / 5);
          for (let dir = 0; dir < 4; dir++) {
            const nr = row + dr[dir];
            const nc = col + dc[dir];
            if (
              nr >= 0 &&
              nr < R &&
              nc >= 0 &&
              nc < C &&
              board[nr][nc] !== -1
            ) {
              count += 1;
              spreaded[nr][nc] += insert;
            }
          }
          board[row][col] = board[row][col] - insert * count;
        }
      }
    }
    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        board[row][col] += spreaded[row][col];
      }
    }
  };

  const purify = () => {
    let row = purifier[0][0];
    let col = purifier[0][1];
    let dir = 1;
    let ex = board[row][col];
    while (true) {
      const nr = row + dr[dir];
      const nc = col + dc[dir];
      if (nr < 0 || nr >= R || nc < 0 || nc >= C) {
        dir = (dir + 3) % 4;
        continue;
      }
      if (board[nr][nc] === -1) {
        break;
      } else {
        const temp = board[nr][nc];
        board[nr][nc] = ex === -1 ? 0 : ex;
        ex = temp;
      }
      row = nr;
      col = nc;
    }
    row = purifier[1][0];
    col = purifier[1][1];
    dir = 1;
    ex = board[row][col];
    while (true) {
      const nr = row + dr[dir];
      const nc = col + dc[dir];
      if (nr < 0 || nr >= R || nc < 0 || nc >= C) {
        dir = (dir + 1) % 4;
        continue;
      }
      if (board[nr][nc] === -1) {
        break;
      } else {
        const temp = board[nr][nc];
        board[nr][nc] = ex === -1 ? 0 : ex;
        ex = temp;
      }
      row = nr;
      col = nc;
    }
  };

  let time = 0;
  while (time < T) {
    spread();
    purify();
    time += 1;
  }
  let answer = 0;
  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      answer += Math.max(board[row][col], 0);
    }
  }
  console.log(answer);
};

solution(board, T);
