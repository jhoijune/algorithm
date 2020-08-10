import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source)
  .toString()
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = (input: number[]) => {
  const [F, S, G, U, D] = input;
  const visited = new Array<boolean>(F).fill(false);
  let queue: number[] = [];
  let count = 0;
  queue.push(S);
  visited[S - 1] = true;
  while (queue.length !== 0) {
    const newQueue: number[] = [];
    for (const level of queue) {
      if (level === G) {
        console.log(count);
        return;
      }
      if (level + U <= F && !visited[level + U - 1]) {
        visited[level + U - 1] = true;
        newQueue.push(level + U);
      }
      if (level - D >= 1 && !visited[level - D - 1]) {
        visited[level - D - 1] = true;
        newQueue.push(level - D);
      }
    }
    queue = newQueue;
    count += 1;
  }
  console.log('use the stairs');
};

solution(input);
