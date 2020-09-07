import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: string[][] = [];

for (let index = 1; index < input.length; index++) {
  board.push(input[index].trim().split(''));
}

const solution = function (board: string[][]) {
  const EMPTY = '0';
  const WALL = '1';
  const N = board.length;
  const M = board[0].length;

  let queue: [number, number, number][] = [];
  const visited = Array.from(Array(N), () =>
    new Array<number>(M).fill(Infinity)
  );
  queue.push([0, 0, 0]);
  visited[0][0] = 0;

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  while (queue.length !== 0) {
    const newQueue: [number, number, number][] = [];
    for (const [row, col, count] of queue) {
      for (let dir = 0; dir < 4; dir++) {
        const nr = row + dr[dir];
        const nc = col + dc[dir];
        if (nr >= 0 && nr < N && nc >= 0 && nc < M) {
          if (board[nr][nc] === EMPTY && count < visited[nr][nc]) {
            visited[nr][nc] = count;
            newQueue.push([nr, nc, count]);
          } else if (board[nr][nc] === WALL && count + 1 < visited[nr][nc]) {
            visited[nr][nc] = count + 1;
            newQueue.push([nr, nc, count + 1]);
          }
        }
      }
    }
    queue = newQueue;
  }
  console.log(visited[N - 1][M - 1]);
};

solution(board);
