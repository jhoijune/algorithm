import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (num: string) => {
  /**
   * time complexity: O(n);
   */
  const counts = new Array<number>(10).fill(0);
  for (const value of num) {
    counts[Number(value)] = counts[Number(value)] + 1;
  }
  if (counts[0] === 0) {
    console.log(-1);
    return;
  }
  let sum = 0;
  for (let value = 1; value < 10; value++) {
    sum += value * counts[value];
  }
  if (sum % 3 !== 0) {
    console.log(-1);
    return;
  }
  console.log(
    counts.reduceRight(
      (prev, count, num) => prev + num.toString().repeat(count),
      ''
    )
  );
};

let num: string;

rl.on('line', (line) => {
  num = line;
  rl.close();
}).on('close', () => {
  solution(num);
  process.exit();
});
