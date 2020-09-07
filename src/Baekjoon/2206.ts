import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: string[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(input[index].trim().split(''));
}

const solution = function (board: string[][]) {
  const N = board.length;
  const M = board[0].length;
  if (N === 1 && M === 1) {
    console.log(1);
    return;
  }
  const MOVABLE = '0';
  const WALL = '1';
  let queue: {
    row: number;
    col: number;
    isBreaked: number;
  }[] = [];
  queue.push({
    row: 0,
    col: 0,
    isBreaked: 0,
  });
  const visited = Array.from(Array(N), () =>
    Array.from(Array(M), () => new Array<boolean>(2).fill(false))
  );
  visited[0][0][0] = true;
  let count = 1;

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  while (queue.length !== 0) {
    const newQueue: {
      row: number;
      col: number;
      isBreaked: number;
    }[] = [];
    for (const { row, col, isBreaked } of queue) {
      for (let dir = 0; dir < 4; dir++) {
        const nr = row + dr[dir];
        const nc = col + dc[dir];
        if (nr === N - 1 && nc === M - 1) {
          console.log(count + 1);
          return;
        }
        if (nr < 0 || nr >= N || nc < 0 || nc >= M) {
          continue;
        }
        if (board[nr][nc] === MOVABLE && !visited[nr][nc][isBreaked]) {
          visited[nr][nc][isBreaked] = true;
          newQueue.push({
            isBreaked,
            row: nr,
            col: nc,
          });
        } else if (
          !isBreaked &&
          board[nr][nc] === WALL &&
          !visited[nr][nc][1]
        ) {
          visited[nr][nc][1] = true;
          newQueue.push({
            row: nr,
            col: nc,
            isBreaked: 1,
          });
        }
      }
    }
    queue = newQueue;
    count += 1;
  }
  console.log(-1);
};

solution(board);
