import { createInterface } from 'readline';
import { create } from 'lodash';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (board: string[][]) => {
  const BLOCKED = '#';
  const HOLE = 'O';
  const N = board.length;
  const M = board[0].length;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const { R, B } = (() => {
    const location: {
      R: [number, number];
      B: [number, number];
    } = { R: [0, 0], B: [0, 0] };
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        if (board[row][col] === 'R') {
          location.R = [row, col];
        } else if (board[row][col] === 'B') {
          location.B = [row, col];
        }
      }
    }
    return location;
  })();

  const move = (
    loc: [number, number],
    direction: number
  ): [number, number, number] => {
    let curr = [...loc] as [number, number];
    let count = 0;
    while (true) {
      const nr = curr[0] + dr[direction];
      const nc = curr[1] + dc[direction];
      if (board[nr][nc] === BLOCKED) {
        break;
      }
      count += 1;
      curr = [nr, nc];
      if (board[nr][nc] === HOLE) {
        break;
      }
    }
    return [...curr, count] as [number, number, number];
  };

  const createKey = (loc1: number[], loc2: number[]): string =>
    `(${loc1.toString()}),(${loc2.toString()})`;

  let queue: { R: [number, number]; B: [number, number] }[] = [];
  queue.push({ R, B });
  const locationSet = new Set<string>();
  locationSet.add(createKey(R, B));
  let count = 0;
  while (queue.length !== 0 && count <= 10) {
    const newQueue: {
      R: [number, number];
      B: [number, number];
    }[] = [];
    for (const { R, B } of queue) {
      if (board[B[0]][B[1]] === HOLE) {
        continue;
      }
      if (board[R[0]][R[1]] === HOLE) {
        console.log(count);
        return;
      }
      for (let dir = 0; dir < 4; dir++) {
        const nR = move(R, dir);
        const nB = move(B, dir);
        if (
          nR[0] === nB[0] &&
          nR[1] === nB[1] &&
          board[nR[0]][nR[1]] !== HOLE
        ) {
          if (nR[2] > nB[2]) {
            nR[0] = nR[0] - dr[dir];
            nR[1] = nR[1] - dc[dir];
          } else {
            nB[0] = nB[0] - dr[dir];
            nB[1] = nB[1] - dc[dir];
          }
        }
        const key = createKey(nR.slice(0, 2), nB.slice(0, 2));
        if (!locationSet.has(key)) {
          locationSet.add(key);
          newQueue.push({
            R: nR.slice(0, 2) as [number, number],
            B: nB.slice(0, 2) as [number, number],
          });
        }
      }
    }
    queue = newQueue;
    count += 1;
  }
  console.log(-1);
};

let N: number;
let M: number;
const board: string[][] = [];

rl.on('line', (line) => {
  if (typeof N === 'undefined') {
    [N, M] = line.split(' ').map((v) => Number(v));
  } else {
    board.push(line.split(''));
    if (board.length === N) {
      rl.close();
    }
  }
}).on('close', () => {
  solution(board);
  process.exit();
});
