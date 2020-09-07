import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const S = Number(readFileSync(source).toString().trim());

const solution = function (S: number) {
  let queue: { count: number; clipboard: number }[] = [];
  const unique = new Set<string>();
  queue.push({ count: 1, clipboard: 0 });
  unique.add(`1,0`);

  let time = 0;
  while (queue.length !== 0) {
    const newQueue: { count: number; clipboard: number }[] = [];
    for (const { count, clipboard } of queue) {
      if (!unique.has(`${count},${count}`)) {
        newQueue.push({ count: count, clipboard: count });
        unique.add(`${count},${count}`);
      }
      if (clipboard !== 0) {
        if (count + clipboard === S) {
          console.log(time + 1);
          return;
        }
        if (!unique.has(`${count + clipboard},${clipboard}`)) {
          newQueue.push({ count: count + clipboard, clipboard: clipboard });
          unique.add(`${count + clipboard},${clipboard}`);
        }
      }
      if (count > 0) {
        if (count - 1 === S) {
          console.log(time + 1);
          return;
        }
        if (!unique.has(`${count - 1},${clipboard}`)) {
          newQueue.push({ count: count - 1, clipboard });
          unique.add(`${count - 1},${clipboard}`);
        }
      }
    }
    queue = newQueue;
    time += 1;
  }
};

solution(S);
