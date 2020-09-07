import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

let index = 0;

const [R, C, M] = input[index++]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const sharks: [number, number, number, number, number][] = [];
for (; index <= M; index++) {
  sharks.push(
    input[index]
      .trim()
      .split(' ')
      .map((v, i) => {
        if (i < 2) {
          return Number(v) - 1;
        }
        return Number(v);
      }) as [number, number, number, number, number]
  );
}

const solution = function (
  R: number,
  C: number,
  sharks: [number, number, number, number, number][]
) {
  const M = sharks.length;
  const survived = new Array<boolean>(M).fill(true);
  let answer = 0;

  const move = function (
    row: number,
    col: number,
    speed: number,
    direction: number
  ) {
    if (direction < 3) {
      const calc = row + (direction === 2 ? speed : -speed);
      const quota = Math.floor(calc / (R - 1));
      const remain = calc % (R - 1);
      if (Object.is(0, quota % 2)) {
        row = remain;
      } else if (quota % 2 === 1) {
        row = R - 1 - remain;
        direction = 1;
      } else if (remain === 0) {
        if (quota % 2 === 0) {
          row = 0;
          direction = 1;
        } else {
          row = R - 1;
          direction = 2;
        }
      } else if (Object.is(-0, quota % 2)) {
        row = R - 1 + remain;
        direction = 1;
      } else {
        row = Math.abs(remain);
        direction = 2;
      }
    } else {
      const calc = col + (direction === 3 ? speed : -speed);
      const quota = Math.floor(calc / (C - 1));
      const remain = calc % (C - 1);
      if (Object.is(0, quota % 2)) {
        col = remain;
      } else if (quota % 2 === 1) {
        col = C - 1 - remain;
        direction = 4;
      } else if (remain === 0) {
        if (quota % 2 === 0) {
          col = 0;
          direction = 3;
        } else {
          col = C - 1;
          direction = 4;
        }
      } else if (Object.is(-0, quota % 2)) {
        col = C - 1 + remain;
        direction = 4;
      } else {
        col = Math.abs(remain);
        direction = 3;
      }
    }
    return [row, col, direction];
  };

  let curr = 0;

  while (curr < C) {
    let selected = -1;
    let minRow = R;
    for (let index = 0; index < M; index++) {
      if (
        survived[index] &&
        sharks[index][1] === curr &&
        sharks[index][0] < minRow
      ) {
        selected = index;
        minRow = sharks[index][0];
      }
    }
    if (selected !== -1) {
      survived[selected] = false;
      answer += sharks[selected][4];
    }
    const board = Array.from(Array(R), () => new Array<number>(C).fill(0));

    for (let index = 0; index < M; index++) {
      if (!survived[index]) {
        continue;
      }
      const [row, col, direction] = move(
        sharks[index][0],
        sharks[index][1],
        sharks[index][2],
        sharks[index][3]
      );
      sharks[index][0] = row;
      sharks[index][1] = col;
      sharks[index][3] = direction;
      board[row][col] = Math.max(board[row][col], sharks[index][4]);
    }
    for (let index = 0; index < M; index++) {
      if (!survived[index]) {
        continue;
      }
      const [row, col, , , size] = sharks[index];
      if (size < board[row][col]) {
        survived[index] = false;
      }
    }
    curr += 1;
  }
  console.log(answer);
};

solution(R, C, sharks);
