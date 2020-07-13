import { createInterface } from 'readline';
import { multiply } from 'lodash';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (num: number) => {
  /**
   * time complexity: O(n)
   */
  if (num <= 2) {
    console.log(num);
    return;
  }
  let n = 1;
  let m = 2;
  let count = 0;
  while (count < num - 2) {
    const sum = (n + m) % 10007;
    n = m;
    m = sum;
    count += 1;
  }
  console.log(m % 10007);
};

let num: number;

rl.on('line', (line) => {
  num = Number(line);
  rl.close();
}).on('close', () => {
  solution(num);
  process.exit();
});
