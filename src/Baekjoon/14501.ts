import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (schedule: [number, number][]) => {
  const size = schedule.length;
  const table = new Array<number>(size).fill(0);
  for (let index = 0; index < size; index++) {
    let max = 0;
    if (index > 0) {
      max = Math.max(...table.slice(0, index));
    }
    const [time, value] = schedule[index];
    if (index + time - 1 < size) {
      table[index + time - 1] = Math.max(table[index + time - 1], max + value);
    }
  }
  console.log(Math.max(...table));
};

let count: number;
const schedule: [number, number][] = [];

rl.on('line', (line) => {
  if (typeof count === 'undefined') {
    count = Number(line);
  } else {
    schedule.push(line.split(' ').map((v) => Number(v)) as [number, number]);
    if (schedule.length === count) {
      rl.close();
    }
  }
}).on('close', () => {
  solution(schedule);
  process.exit();
});
