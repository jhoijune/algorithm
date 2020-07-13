import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin').toString().trim();

const solution = (num: number) => {
  /**
   * time complexity: O(n)
   */
  let n = 1;
  let m = 1;
  let count = 0;
  while (count < num - 1) {
    const sum = (n * 2 + m) % 10007;
    n = m;
    m = sum;
    count += 1;
  }
  console.log(m);
};

solution(Number(input));
