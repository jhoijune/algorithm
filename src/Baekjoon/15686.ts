import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [, M] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const board: number[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = (board: number[][], M: number) => {
  const HOUSE = 1;
  const CHICKEN = 2;
  const N = board.length;
  const chickenAxis: [number, number][] = [];
  const houseAxis: [number, number][] = [];

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (board[row][col] === HOUSE) {
        houseAxis.push([row, col]);
      } else if (board[row][col] === CHICKEN) {
        chickenAxis.push([row, col]);
      }
    }
  }

  const size = chickenAxis.length;
  let answer = Infinity;
  for (let i = (1 << M) - 1; i < 1 << size; i++) {
    const selected = [];
    for (let j = 0; j < size; j++) {
      if (i & (1 << j)) {
        selected.push(chickenAxis[j]);
      }
    }
    if (selected.length !== M) {
      continue;
    }
    let sum = 0;
    for (const [houseRow, houseCol] of houseAxis) {
      let curr = Infinity;
      for (const [chickenRow, chickenCol] of selected) {
        curr = Math.min(
          Math.abs(houseRow - chickenRow) + Math.abs(houseCol - chickenCol),
          curr
        );
      }
      sum += curr;
    }
    answer = Math.min(answer, sum);
  }
  console.log(answer);
};

solution(board, M);
