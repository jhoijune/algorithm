import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (target: number, money: number[]) => {
  /**
   * time complexity: O(n)
   */
  const size = money.length;
  let curr = target;
  let answer = 0;
  let loc = size - 1;
  while (curr !== 0 && loc >= 0) {
    if (curr / money[loc] >= 1) {
      answer += Math.floor(curr / money[loc]);
      curr = curr % money[loc];
    }
    loc -= 1;
  }
  console.log(answer);
};

let count: number;
let target: number;
const money: number[] = [];

rl.on('line', (line) => {
  if (typeof count === 'undefined') {
    [count, target] = line.split(' ').map((v) => Number(v));
  } else {
    money.push(Number(line));
    if (count === money.length) {
      rl.close();
    }
  }
}).on('close', () => {
  solution(target, money);
  process.exit();
});
