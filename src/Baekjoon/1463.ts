import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (num: number) => {
  let queue: number[] = [];
  const numberSet = new Set<number>();
  queue.push(num);
  let count = 0;
  while (queue.length !== 0) {
    const newQueue: number[] = [];
    for (const value of queue) {
      if (value === 1) {
        console.log(count);
        return;
      }
      if (value % 3 === 0 && !numberSet.has(value / 3)) {
        numberSet.add(value / 3);
        newQueue.push(value / 3);
      }
      if (value % 2 === 0 && !numberSet.has(value / 2)) {
        numberSet.add(value / 2);
        newQueue.push(value / 2);
      }
      if (!numberSet.has(value - 1)) {
        numberSet.add(value - 1);
        newQueue.push(value - 1);
      }
    }
    queue = newQueue;
    count += 1;
  }
};

const solution2 = (num: number) => {
  /**
   * time complexity: O(n)
   */
  const LIMIT = Math.pow(10, 6) + 1;
  const table = new Array<number>(LIMIT).fill(0);
  let curr = 2;
  while (curr <= num) {
    table[curr] = table[curr - 1] + 1;
    if (curr % 3 === 0) {
      table[curr] = Math.min(table[curr / 3] + 1, table[curr]);
    }
    if (curr % 2 === 0) {
      table[curr] = Math.min(table[curr / 2] + 1, table[curr]);
    }
    curr += 1;
  }
  console.log(table[num]);
};

let num: number;

rl.on('line', (line) => {
  num = Number(line);
  rl.close();
}).on('close', () => {
  solution(num);
  process.exit();
});
