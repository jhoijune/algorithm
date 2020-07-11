import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (n: number) => {
  let answer = 0;
  const dfs = (curr: number) => {
    if (curr === n) {
      answer += 1;
      return;
    } else if (curr > n) {
      return;
    } else {
      for (let num = 1; num <= 3; num++) {
        dfs(curr + num);
      }
    }
  };
  dfs(0);
  console.log(answer);
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
