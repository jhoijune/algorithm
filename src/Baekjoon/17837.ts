import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

let index = 0;
const [N, K] = input[index++]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const boardColor: number[][] = [];
const init: [number, number, number][] = [];

for (; index <= N; index++) {
  boardColor.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}
for (; index <= N + K; index++) {
  init.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v) - 1) as [number, number, number]
  );
}

const solution = function (
  boardColor: number[][],
  init: [number, number, number][]
) {
  const WHITE = 0;
  const RED = 1;
  const BLUE = 2;
  const N = boardColor.length;
  const K = init.length;
  const board = Array.from(Array(N), () =>
    Array.from(Array(N), () => new Array<number>())
  );
  const infos: [number, number, number][] = [];
  for (const value of init) {
    infos.push([...value] as [number, number, number]);
  }

  const dr = [0, 0, -1, 1];
  const dc = [1, -1, 0, 0];

  for (let num = 0; num < K; num++) {
    const [row, col] = infos[num];
    board[row][col].push(num);
  }

  let turn = 0;
  while (turn < 1000) {
    turn += 1;
    for (let num = 0; num < K; num++) {
      let [row, col, dir] = infos[num];
      const index = board[row][col].lastIndexOf(num);
      const container = board[row][col].slice(index);
      board[row][col] = board[row][col].slice(0, index);

      let count = 0;
      while (count < 2) {
        let nr = row + dr[dir];
        let nc = col + dc[dir];
        if (
          nr < 0 ||
          nr >= N ||
          nc < 0 ||
          nc >= N ||
          boardColor[nr][nc] === BLUE
        ) {
          if (count === 0) {
            dir = 2 * Math.floor(dir / 2) + (dir % 2 === 0 ? 1 : 0);
            infos[num][2] = dir;
            count += 1;
            continue;
          } else {
            nr = row;
            nc = col;
            board[nr][nc] = [...board[nr][nc], ...container];
          }
        } else if (boardColor[nr][nc] === WHITE) {
          board[nr][nc] = [...board[nr][nc], ...container];
        } else if (boardColor[nr][nc] === RED) {
          board[nr][nc] = [...board[nr][nc], ...container.reverse()];
        }
        if (board[nr][nc].length >= 4) {
          console.log(turn);
          return;
        }
        for (const num of container) {
          infos[num] = [nr, nc, infos[num][2]];
        }
        count += 2;
      }
    }
  }
  console.log(-1);
};

solution(boardColor, init);
