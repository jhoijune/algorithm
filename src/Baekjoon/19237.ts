import { readFileSync } from 'fs';

class Shark {
  constructor(public number: number, public direction: number) {}
}

class Smell {
  constructor(public number: number, public remain: number) {}
}

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [N, M, k] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const directions = input[N + 1]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const board: (Smell | Shark)[][][] = [];
for (let index = 1; index <= N; index++) {
  board.push([]);
  for (const num of input[index]
    .trim()
    .split(' ')
    .map((v) => Number(v))) {
    if (num === 0) {
      board[index - 1].push([]);
    } else {
      const smell = new Smell(num, k);
      const shark = new Shark(num, directions[num - 1]);
      board[index - 1].push([smell, shark]);
    }
  }
}

const priorities: number[][][] = [];
for (let n = N + 2; n < input.length; n += 4) {
  priorities.push([]);
  for (let count = 0; count < 4; count++) {
    priorities[priorities.length - 1].push(
      input[n + count]
        .trim()
        .split(' ')
        .map((v) => Number(v))
    );
  }
}

const solution = function (
  board: (Smell | Shark)[][][],
  priorities: number[][][],
  M: number,
  k: number
) {
  const N = board.length;
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  const move = function () {
    const moved = new Array(M).fill(false);
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        const size = board[row][col].length;
        const arr: (Shark | Smell)[] = [];
        for (let index = 0; index < size; index++) {
          const temp = board[row][col][index];
          if (temp instanceof Shark && !moved[temp.number - 1]) {
            moved[temp.number - 1] = true;
            let isExecuted = false;
            for (const dir of priorities[temp.number - 1][temp.direction - 1]) {
              const nr = row + dr[dir - 1];
              const nc = col + dc[dir - 1];
              if (nr < 0 || nr >= N || nc < 0 || nc >= N) {
                continue;
              }
              let isSmellExist = false;
              for (const foo of board[nr][nc]) {
                if (foo instanceof Smell) {
                  isSmellExist = true;
                }
              }
              if (!isSmellExist) {
                temp.direction = dir;
                board[nr][nc].push(temp);
                isExecuted = true;
                break;
              }
            }
            for (const dir of priorities[temp.number - 1][temp.direction - 1]) {
              if (!isExecuted) {
                const nr = row + dr[dir - 1];
                const nc = col + dc[dir - 1];
                if (nr < 0 || nr >= N || nc < 0 || nc >= N) {
                  continue;
                }
                for (const foo of board[nr][nc]) {
                  if (foo instanceof Smell && foo.number === temp.number) {
                    temp.direction = dir;
                    board[nr][nc].push(temp);
                    isExecuted = true;
                    break;
                  }
                }
              }
            }
          } else {
            arr.push(temp);
          }
        }
        board[row][col] = arr;
      }
    }
  };

  const competition = function () {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        let min = Infinity;
        const arr: (Shark | Smell)[] = [];
        for (const temp of board[row][col]) {
          if (temp instanceof Shark) {
            min = Math.min(min, temp.number);
          }
        }
        for (const temp of board[row][col]) {
          if (temp instanceof Shark && min === temp.number) {
            arr.push(temp);
          } else if (temp instanceof Smell) {
            arr.push(temp);
          }
        }
        board[row][col] = arr;
      }
    }
  };

  const changeSmell = function () {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        const arr: (Smell | Shark)[] = [];
        const size = board[row][col].length;
        for (let index = 0; index < size; index++) {
          const temp = board[row][col][index];
          if (temp instanceof Shark) {
            const smell = new Smell(temp.number, k);
            arr.push(temp);
            arr.push(smell);
          } else if (temp.remain > 1) {
            temp.remain -= 1;
            arr.push(temp);
          }
        }
        board[row][col] = arr;
      }
    }
  };

  const check = function (): boolean {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        for (const temp of board[row][col]) {
          if (temp instanceof Shark && temp.number !== 1) {
            return false;
          }
        }
      }
    }
    return true;
  };

  let time = 0;
  while (time < 1000) {
    time += 1;
    move();
    competition();
    if (check()) {
      console.log(time);
      return;
    }
    changeSmell();
  }
  console.log(-1);
};

solution(board, priorities, M, k);
