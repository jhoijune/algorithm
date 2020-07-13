import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (n: number, m: number, k: number) => {
  /**
   * time complexity: O(n)
   */
  if (n / m < 2) {
    k -= m - Math.floor(n / 2);
    k = Math.max(k, 0);
    m = Math.floor(n / 2);
  }
  if (n / m > 2) {
    k -= n - 2 * m;
    k = Math.max(k, 0);
  }
  let answer = m - Math.ceil(k / 3);
  console.log(answer);
};

let n: number;
let m: number;
let k: number;

rl.on('line', (line) => {
  [n, m, k] = line.split(' ').map((v) => Number(v));
  rl.close();
}).on('close', () => {
  solution(n, m, k);
  process.exit();
});
