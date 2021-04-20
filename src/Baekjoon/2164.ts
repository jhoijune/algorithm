import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const capacity = Number(readFileSync(source).toString().trim());

const solution = function (capacity: number) {
  const cards = [...new Array(capacity).keys()].map((v) => v + 1);
  let size = capacity;
  let front = 0;
  while (size !== 1) {
    cards[front] = -1;
    front = (front + 1) % capacity;
    size -= 1;
    const ex = cards[front];
    cards[front] = -1;
    front = (front + 1) % capacity;
    cards[(front + size - 1) % capacity] = ex;
  }
  console.log(cards[front]);
};

solution(capacity);
