import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const operators = ['+', '-', '*', '/'];

function* _permutationUtil(
  curr: string,
  num: number[]
): IterableIterator<string> {
  if (num.every((v) => v === 0)) {
    yield curr;
  } else {
    const size = num.length;
    for (let index = 0; index < size; index++) {
      if (num[index] !== 0) {
        const modified = [...num];
        modified[index] -= 1;
        for (const value of _permutationUtil(
          curr + operators[index],
          modified
        )) {
          yield value;
        }
      }
    }
  }
}

function* permutation(counts: number[]): IterableIterator<string> {
  for (const combination of _permutationUtil('', counts)) {
    yield combination;
  }
}

const solution = (num: number[], counts: number[]) => {
  const size = num.length;
  let max = -Infinity;
  let min = Infinity;
  for (const combination of permutation(counts)) {
    let result = num[0];
    for (let index = 0; index < size - 1; index++) {
      if (combination[index] === '+') {
        result += num[index + 1];
      } else if (combination[index] === '-') {
        result -= num[index + 1];
      } else if (combination[index] === '*') {
        result *= num[index + 1];
      } else {
        const calculation = result / num[index + 1];
        result =
          calculation >= 0 ? Math.floor(calculation) : Math.ceil(calculation);
      }
    }
    max = Math.max(max, result);
    min = Math.min(min, result);
  }

  console.log(max ? max : 0);
  console.log(min ? min : 0);
};

let count: number;
let num: number[];
let counts: number[];

rl.on('line', (line) => {
  if (typeof count === 'undefined') {
    count = Number(line);
  } else if (typeof num === 'undefined') {
    num = line.split(' ').map((v) => Number(v));
  } else if (typeof counts === 'undefined') {
    counts = line.split(' ').map((v) => Number(v));
    rl.close();
  }
}).on('close', () => {
  solution(num, counts);
  process.exit();
});
