import { readFileSync } from 'fs';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

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

const solution = (board: number[][]) => {
  const N = board.length;
  let loc: number[] = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (board[row][col] === 9) {
        loc.push(row, col);
        board[row][col] = 0;
        break;
      }
    }
  }

  let time = 0;
  let size = 2;
  let eaten = 0;

  const dr = [-1, 0, 1, 0];
  const dc = [0, -1, 0, 1];

  const explore = (init: number[]) => {
    const visited = Array.from(Array(N), () =>
      new Array<boolean>(N).fill(false)
    );
    let queue: number[][] = [init];
    let time = 0;
    const result: number[][] = [];
    while (queue.length !== 0) {
      const newQueue: number[][] = [];
      for (const [row, col] of queue) {
        for (let dir = 0; dir < 4; dir++) {
          const nr = row + dr[dir];
          const nc = col + dc[dir];
          if (nr < 0 || nr >= N || nc < 0 || nc >= N || visited[nr][nc]) {
            continue;
          }
          if (board[nr][nc] !== 0 && board[nr][nc] < size) {
            visited[nr][nc] = true;
            result.push([nr, nc]);
          } else if (board[nr][nc] === 0 || board[nr][nc] === size) {
            visited[nr][nc] = true;
            newQueue.push([nr, nc]);
          }
        }
      }
      if (result.length !== 0) {
        result.sort((a, b) => {
          if (a[0] < b[0]) {
            return -1;
          } else if (a[0] > b[0]) {
            return 1;
          } else if (a[1] < b[1]) {
            return -1;
          } else if (a[1] > b[1]) {
            return 1;
          }
          return 0;
        });
        const [[nr, nc]] = result;
        board[nr][nc] = 0;
        return [nr, nc, time + 1];
      } else {
        queue = newQueue;
        time += 1;
      }
    }
    return null;
  };

  while (true) {
    const result = explore(loc);
    if (result === null) {
      break;
    }
    loc = [result[0], result[1]];
    time += result[2];
    eaten += 1;
    if (eaten === size) {
      size += 1;
      eaten = 0;
    }
  }
  console.log(time);
};

solution(board);
