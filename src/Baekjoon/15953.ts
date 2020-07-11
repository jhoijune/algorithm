import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prize1 = [500, 300, 200, 50, 30, 10];
const prize2 = [512, 256, 128, 64, 32];

const solution = (rank1: number, rank2: number) => {
  let sum = 0;
  let index = 0;
  let rankSum = 1;
  while (rank1 !== 0 && index < prize1.length) {
    if (rank1 <= rankSum) {
      sum += prize1[index];
      break;
    } else {
      index += 1;
      rankSum += index + 1;
    }
  }
  index = 0;
  rankSum = 1;
  while (rank2 !== 0 && index < prize2.length) {
    if (rank2 <= rankSum) {
      sum += prize2[index];
      break;
    } else {
      index += 1;
      rankSum += Math.pow(2, index);
    }
  }
  console.log(sum * Math.pow(10, 4));
};

let size = 0;

const rank1s: number[] = [];
const rank2s: number[] = [];

rl.on('line', (line) => {
  if (size === 0) {
    size = Number.parseInt(line);
  } else {
    const [rank1, rank2] = line.split(' ');
    rank1s.push(Number(rank1));
    rank2s.push(Number(rank2));
  }
  if (size === rank1s.length) {
    rl.close();
  }
}).on('close', () => {
  for (let index = 0; index < size; index++) {
    solution(rank1s[index], rank2s[index]);
  }
  process.exit();
});
