import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: string[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(input[index].trim().split(''));
}

const solution = function (board: string[][]) {
  const R = board.length;
  const C = board[0].length;

  let queue: {
    visited: number;
    row: number;
    col: number;
  }[] = [];

  queue.push({
    visited: 0,
    row: 0,
    col: 0,
  });
  const code = board[0][0].charCodeAt(0) - 'A'.charCodeAt(0);
  queue[0].visited = queue[0].visited ^ (1 << code);
  let count = 1;

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  while (queue.length !== 0) {
    const newQueue: {
      visited: number;
      row: number;
      col: number;
    }[] = [];
    for (const { visited, row, col } of queue) {
      for (let dir = 0; dir < 4; dir++) {
        const nr = row + dr[dir];
        const nc = col + dc[dir];
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) {
          continue;
        }
        const char = board[nr][nc];
        const code = char.charCodeAt(0) - 'A'.charCodeAt(0);
        if (!(visited & (1 << code))) {
          newQueue.push({
            visited: visited ^ (1 << code),
            row: nr,
            col: nc,
          });
        }
      }
    }
    queue = newQueue;
    count += 1;
  }
  console.log(count - 1);
};

solution(board);
