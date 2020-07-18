import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [, L] = input[0].split(' ');
const board: number[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(input[index].split(' ').map((v) => Number(v)));
}

const solution = (board: number[][], L: number) => {
  const N = board.length;
  let answer = 0;

  const judge = (num: number[]) => {
    const isEmpty = new Array<boolean>(N).fill(true);
    let loc = 0;
    while (loc < N - 1) {
      if (num[loc] === num[loc + 1]) {
        loc += 1;
      } else if (num[loc] + 1 === num[loc + 1]) {
        let curr = loc;
        while (curr >= 0 && loc - curr < L) {
          if (num[curr] === num[loc] && isEmpty[curr]) {
            curr -= 1;
          } else {
            break;
          }
        }
        if (loc - curr === L) {
          for (let i = curr + 1; i <= loc; i++) {
            isEmpty[i] = false;
          }
          loc += 1;
        } else {
          break;
        }
      } else if (num[loc] === num[loc + 1] + 1) {
        let curr = loc + 1;
        while (curr < N && curr - loc - 1 < L) {
          if (num[loc + 1] === num[curr] && isEmpty[curr]) {
            curr += 1;
          } else {
            break;
          }
        }
        if (curr - loc - 1 === L) {
          for (let i = loc + 1; i < curr; i++) {
            isEmpty[i] = false;
          }
          loc = curr - 1;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    if (loc === N - 1) {
      answer += 1;
    }
  };

  for (let row = 0; row < N; row++) {
    const numbers = [];
    for (let col = 0; col < N; col++) {
      numbers.push(board[row][col]);
    }
    judge(numbers);
  }

  for (let col = 0; col < N; col++) {
    const numbers = [];
    for (let row = 0; row < N; row++) {
      numbers.push(board[row][col]);
    }
    judge(numbers);
  }

  console.log(answer);
};

solution(board, Number(L));
