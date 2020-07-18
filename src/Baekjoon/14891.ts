import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const sawtooth = input.slice(0, 4).map((v) =>
  v
    .trim()
    .split('')
    .map((v) => Number(v))
);
const instruction = input.slice(5, input.length).map((v) =>
  v
    .trim()
    .split(' ')
    .map((v) => Number(v))
);

const solution = (sawtooth: number[][], instruction: number[][]) => {
  let curr = [0, 0, 0, 0];

  const rotate = (num: number, direction: number) => {
    if (direction === 1) {
      curr[num - 1] = (8 + curr[num - 1] - 1) % 8;
    } else {
      curr[num - 1] = (curr[num - 1] + 1) % 8;
    }
  };

  const direction3Value = (num: number) => {
    const index = (curr[num - 1] + 2) % 8;
    return sawtooth[num - 1][index];
  };

  const direction9Value = (num: number) => {
    const index = (8 + curr[num - 1] - 2) % 8;
    return sawtooth[num - 1][index];
  };

  for (const [num, direction] of instruction) {
    const queue = [];
    queue.push([num, direction]);
    let currNum = num;
    let currDir = direction;
    while (currNum > 1) {
      if (direction9Value(currNum) ^ direction3Value(currNum - 1)) {
        currNum -= 1;
        currDir = -currDir;
        queue.push([currNum, currDir]);
      } else {
        break;
      }
    }
    currNum = num;
    currDir = direction;
    while (currNum < 4) {
      if (direction3Value(currNum) ^ direction9Value(currNum + 1)) {
        currNum += 1;
        currDir = -currDir;
        queue.push([currNum, currDir]);
      } else {
        break;
      }
    }
    queue.forEach(([num, dir]) => rotate(num, dir));
  }
  let sum = 0;
  for (let index = 0; index < 4; index++) {
    const idx = curr[index];
    if (sawtooth[index][idx]) {
      sum += Math.pow(2, index);
    }
  }
  console.log(sum);
};

solution(sawtooth, instruction);
