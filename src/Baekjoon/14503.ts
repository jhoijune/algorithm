import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (board: number[][], state: [number, number, number]) => {
  const EMPTY = 0;
  const WALL = 1;
  const CLEANED = 2;
  const N = board.length;
  const M = board[0].length;
  let answer = 0;
  let [row, col, dir] = state;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const move = () => {
    row += dr[dir];
    col += dc[dir];
  };

  const isBackwardPossible = () => {
    const nr = row + dr[(dir + 2) % 4];
    const nc = col + dc[(dir + 2) % 4];
    if (nr >= 0 && nr < N && nc >= 0 && nc < M && board[nr][nc] !== WALL) {
      return true;
    }
    return false;
  };

  const backward = () => {
    row += dr[(dir + 2) % 4];
    col += dc[(dir + 2) % 4];
  };

  const isSpaceExist = () => {
    const nr = row + dr[(dir + 3) % 4];
    const nc = col + dc[(dir + 3) % 4];
    if (nr >= 0 && nr < N && nc >= 0 && nc < M && board[nr][nc] === EMPTY) {
      return true;
    }
    return false;
  };

  while (true) {
    if (board[row][col] === EMPTY) {
      board[row][col] = CLEANED;
      answer += 1;
    }
    let possible = true;
    while (true) {
      let count = 0;
      while (count < 4) {
        if (isSpaceExist()) {
          break;
        }
        count += 1;
        dir = (dir + 3) % 4;
      }
      if (count !== 4) {
        dir = (dir + 3) % 4;
        move();
        break;
      }
      if (isBackwardPossible()) {
        backward();
      } else {
        possible = false;
        break;
      }
    }
    if (!possible) {
      break;
    }
  }
  console.log(answer);
};
let N: number;
let state: [number, number, number];
const board: number[][] = [];

rl.on('line', (line) => {
  if (typeof N === 'undefined') {
    N = Number(line.split(' ')[0]);
  } else if (typeof state === 'undefined') {
    state = line.split(' ').map((v) => Number(v)) as [number, number, number];
  } else {
    const container = line.split(' ').map((v) => Number(v));
    board.push(container);
    if (board.length === N) {
      rl.close();
    }
  }
}).on('close', () => {
  solution(board, state);
  process.exit();
});
