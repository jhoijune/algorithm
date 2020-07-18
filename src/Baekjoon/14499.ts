import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [, , row, col] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const initLoc: [number, number] = [row, col];
const board: number[][] = [];

for (let index = 1; index < input.length - 1; index++) {
  board.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const instructions = input[input.length - 1]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = (
  board: number[][],
  initLoc: [number, number],
  instructions: number[]
) => {
  const N = board.length;
  const M = board[0].length;
  const state = new Array<number>(6).fill(0);
  let dice = [1, 2, 3, 4, 5, 6];
  let loc = [...initLoc];
  const dr = [0, 0, -1, 1];
  const dc = [1, -1, 0, 0];

  const printTop = () => {
    console.log(state[dice[0] - 1]);
  };

  const rotateDice = (direction: number) => {
    const newDice = [...dice];
    if (direction === 1) {
      newDice[0] = dice[3];
      newDice[2] = dice[0];
      newDice[3] = dice[5];
      newDice[5] = dice[2];
    } else if (direction === 2) {
      newDice[0] = dice[2];
      newDice[2] = dice[5];
      newDice[3] = dice[0];
      newDice[5] = dice[3];
    } else if (direction === 3) {
      newDice[0] = dice[4];
      newDice[1] = dice[0];
      newDice[4] = dice[5];
      newDice[5] = dice[1];
    } else {
      newDice[0] = dice[1];
      newDice[1] = dice[5];
      newDice[4] = dice[0];
      newDice[5] = dice[4];
    }
    dice = newDice;
  };

  for (const instruction of instructions) {
    const nr = loc[0] + dr[instruction - 1];
    const nc = loc[1] + dc[instruction - 1];
    if (nr < 0 || nr >= N || nc < 0 || nc >= M) {
      continue;
    }
    rotateDice(instruction);
    const bottom = 7 - dice[0];
    if (board[nr][nc] === 0) {
      board[nr][nc] = state[bottom - 1];
    } else {
      state[bottom - 1] = board[nr][nc];
      board[nr][nc] = 0;
    }
    loc = [nr, nc];

    printTop();
  }
};

solution(board, initLoc, instructions);
