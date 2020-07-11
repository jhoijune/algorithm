import { createInterface } from 'readline';

function* _permutationsUtil<T>(
  arr: T[],
  num: number,
  curr: any[],
  visited: boolean[]
): IterableIterator<T[]> {
  if (curr.length !== num) {
    const size = arr.length;
    for (let index = 0; index < size; index++) {
      if (!visited[index]) {
        const concat = [...curr, arr[index]];
        visited[index] = true;
        for (const value of _permutationsUtil(arr, num, concat, visited)) {
          yield value;
        }
        visited[index] = false;
      }
    }
  } else {
    yield curr;
  }
}

function* permutations<T>(arr: T[], num: number): IterableIterator<T[]> {
  const size = arr.length;
  if (num > size) {
    throw Error('Invalid input');
  }
  const visited = new Array(size).fill(false);
  for (const value of _permutationsUtil(arr, num, [], visited)) {
    yield value;
  }
}

const solution = (numbers: number[]) => {
  const size = numbers.length;
  let answer = 0;
  for (const cases of permutations(numbers, size)) {
    let sum = 0;
    for (let index = 1; index < size; index++) {
      sum += Math.abs(cases[index] - cases[index - 1]);
    }
    answer = Math.max(answer, sum);
  }
  console.log(answer);
};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let size = 0;
let numbers: number[] = [];

rl.on('line', (line) => {
  if (size === 0) {
    size = Number(line);
  } else {
    numbers = line.split(' ').map((v) => Number(v));
    rl.close();
  }
}).on('close', () => {
  solution(numbers);
  process.exit();
});
