import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let numbers: number[] = [];

const solution = (numbers: number[]) => {
  let num = 1;
  while (true) {
    const mod1 = ((num - 1) % 15) + 1;
    const mod2 = ((num - 1) % 28) + 1;
    const mod3 = ((num - 1) % 19) + 1;
    if (mod1 === numbers[0] && mod2 === numbers[1] && mod3 === numbers[2]) {
      break;
    }
    num += 1;
  }
  console.log(num);
};

rl.on('line', (line) => {
  numbers = line.split(' ').map((v) => Number(v));
  rl.close();
}).on('close', () => {
  solution(numbers);
  process.exit();
});
