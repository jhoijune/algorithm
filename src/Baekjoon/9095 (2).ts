import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (n: number) => {
  let answer = 0;
  const arr = [0, 1, 1, 3, 7];
  let curr = 5;
  while (curr <= n) {
    let sum = 0;
    for (let i = 1; i < curr; i++) {
      sum += arr[i] * arr[curr - i];
    }
  }
  console.log(arr[n]);
};

let size = 0;
const numbers: number[] = [];

rl.on('line', (line) => {
  if (size === 0) {
    size = Number(line);
  } else {
    numbers.push(Number(line));
    if (numbers.length === size) {
      rl.close();
    }
  }
}).on('close', () => {
  for (const number of numbers) {
    solution(number);
  }
  process.exit();
});
