import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const numbers = input[1]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const questions: [number, number][] = [];

for (let index = 3; index < input.length; index++) {
  questions.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v)) as [number, number]
  );
}

const solution = (numbers: number[], questions: [number, number][]) => {
  const size = numbers.length;
  const table = Array.from(Array(size), () =>
    new Array<boolean>(size).fill(false)
  );

  for (let index = 0; index < size; index++) {
    table[index][index] = true;
  }

  for (let index = 0; index < size - 1; index++) {
    if (numbers[index] === numbers[index + 1]) {
      table[index][index + 1] = true;
    }
  }

  for (let len = 2; len < size; len++) {
    for (let start = 0; start < size - len; start++) {
      let end = start + len;
      if (numbers[start] === numbers[end] && table[start + 1][end - 1]) {
        table[start][end] = true;
      }
    }
  }

  for (const [start, end] of questions) {
    if (table[start - 1][end - 1]) {
      console.log(1);
    } else {
      console.log(0);
    }
  }
};

solution(numbers, questions);
