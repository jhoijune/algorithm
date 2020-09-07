import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: string[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(input[index].trim().split(''));
}

const solution = function (board: string[][]) {
  const MOVABLE = '1';
  const N = board.length;
  const M = board[0].length;
  let queue: [number, number][] = [];
  queue.push([0, 0]);
  const visited = Array.from(Array(N), () => new Array<boolean>(M).fill(false));
  visited[0][0] = true;
  let count = 1;

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  while (queue.length !== 0) {
    const newQueue: [number, number][] = [];
    for (const [row, col] of queue) {
      for (let dir = 0; dir < 4; dir++) {
        const nr = row + dr[dir];
        const nc = col + dc[dir];
        if (nr === N - 1 && nc === M - 1) {
          console.log(count + 1);
          return;
        }
        if (
          nr >= 0 &&
          nr < N &&
          nc >= 0 &&
          nc < M &&
          board[nr][nc] === MOVABLE &&
          !visited[nr][nc]
        ) {
          newQueue.push([nr, nc]);
          visited[nr][nc] = true;
        }
      }
    }
    queue = newQueue;
    count += 1;
  }
};

solution(board);
