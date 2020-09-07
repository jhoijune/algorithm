import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const [N, K] = readFileSync(source)
  .toString()
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = function (N: number, K: number) {
  if (N === K) {
    console.log(0);
    console.log(1);
  }
  const set = new Set<number>();
  let queue: [number, number][] = [];
  let searchedTime = -1;
  let count = 0;
  queue.push([N, 0]);
  set.add(N);
  for (const [number, time] of queue) {
    if (count !== 0 && searchedTime === time) {
      break;
    }
    for (const operand of [1, -1, number]) {
      const sum = number + operand;
      if (sum === K) {
        searchedTime = time + 1;
        count += 1;
      } else if (!set.has(sum)) {
        queue.push([sum, time + 1]);
        set.add(sum);
      }
    }
  }
  console.log(searchedTime);
  console.log(count);
};

solution(N, K);
