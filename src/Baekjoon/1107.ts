import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let target: number | null = null;
let brokenLen: number | null = null;
let broken: string[] = [];

const solution = (target: number, broken: string[]) => {
  let answer = Math.abs(target - 100);
  if (broken.length === 10) {
    console.log(answer);
    return;
  }
  const set = new Set<string>(broken);
  // 위로
  let curr = target;
  if (broken.length !== 9 || set.has('0')) {
    while (true) {
      const str = curr.toString();
      const size = str.length;
      let index = 0;
      while (index < size) {
        if (set.has(str[index])) {
          break;
        }
        index += 1;
      }
      if (index === size) {
        const diff = Math.abs(curr - target);
        answer = Math.min(answer, size + diff);
        break;
      }
      curr += 1;
    }
    curr = target;
    // 아래로
    while (curr >= 0) {
      const str = curr.toString();
      const size = str.length;
      let index = 0;
      while (index < size) {
        if (set.has(str[index])) {
          break;
        }
        index += 1;
      }
      if (index === size) {
        const diff = Math.abs(curr - target);
        answer = Math.min(answer, size + diff);
        break;
      }
      curr -= 1;
    }
  } else {
    const diff = Math.abs(target - 0);
    answer = Math.min(answer, 1 + diff);
  }
  console.log(answer);
};

rl.on('line', (line) => {
  if (target === null) {
    target = Number(line);
  } else if (brokenLen === null) {
    brokenLen = Number(line);
  } else {
    broken = line.split(' ');
    rl.close();
  }
  if (brokenLen === 0) {
    rl.close();
  }
}).on('close', () => {
  solution(target!, broken);
  process.exit();
});
