import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (n: number) => {
  /**
   * time complexity: O(n)
   */
  let counts = new Array<number>(10).fill(1);
  counts[0] = 0;
  let number = 1;
  while (number < n) {
    const newCounts = new Array<number>(10).fill(0);
    for (let index = 0; index < 10; index++) {
      if (index !== 0) {
        newCounts[index - 1] += counts[index] % 1000000000;
      }
      if (index !== 9) {
        newCounts[index + 1] += counts[index] % 1000000000;
      }
    }
    counts = newCounts;
    number += 1;
  }
  console.log(counts.reduce((prev, curr) => prev + curr, 0) % 1000000000);
};

let n: number;

rl.on('line', (line) => {
  n = Number(line);
  rl.close();
}).on('close', () => {
  solution(n);
  process.exit();
});
