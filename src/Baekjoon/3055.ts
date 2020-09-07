import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: string[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(input[index].trim().split(''));
}

const solution = function (board: string[][]) {
  const EMPTY = '.';
  const FLOODED = '*';
  const CAVE = 'D';
  const HEDGEHOG = 'S';
  const N = board.length;
  const M = board[0].length;

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const flood = function () {
    const flooded = Array.from(Array(N), () =>
      new Array<boolean>(M).fill(false)
    );
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        if (board[row][col] === FLOODED && !flooded[row][col]) {
          for (let dir = 0; dir < 4; dir++) {
            const nr = row + dr[dir];
            const nc = col + dc[dir];
            if (
              nr >= 0 &&
              nr < N &&
              nc >= 0 &&
              nc < M &&
              board[nr][nc] === EMPTY
            ) {
              board[nr][nc] = FLOODED;
              flooded[nr][nc] = true;
            }
          }
        }
      }
    }
  };

  const target = [-1, -1];

  let queue: [number, number][] = [];
  const visited = Array.from(Array(N), () => new Array<boolean>(M).fill(false));
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (board[row][col] === HEDGEHOG) {
        queue.push([row, col]);
        visited[row][col] = true;
      } else if (board[row][col] === CAVE) {
        target[0] = row;
        target[1] = col;
      }
    }
  }

  let time = 0;
  while (queue.length !== 0) {
    flood();
    const newQueue: [number, number][] = [];
    for (const [row, col] of queue) {
      for (let dir = 0; dir < 4; dir++) {
        const nr = row + dr[dir];
        const nc = col + dc[dir];
        if (nr === target[0] && nc === target[1]) {
          console.log(time + 1);
          return;
        }
        if (
          nr >= 0 &&
          nr < N &&
          nc >= 0 &&
          nc < M &&
          board[nr][nc] === EMPTY &&
          !visited[nr][nc]
        ) {
          newQueue.push([nr, nc]);
          visited[nr][nc] = true;
        }
      }
    }
    queue = newQueue;
    time += 1;
  }
  console.log('KAKTUS');
};

solution(board);
