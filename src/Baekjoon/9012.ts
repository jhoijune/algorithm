import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (str: string) => {
  let count = 0;
  for (const char of str) {
    if (char === '(') {
      count += 1;
    } else if (char === ')' && count > 0) {
      count -= 1;
    } else {
      console.log('NO');
      return;
    }
  }
  if (count === 0) {
    console.log('YES');
  } else {
    console.log('NO');
  }
};

let count: number;

const strings: string[] = [];

rl.on('line', (line) => {
  if (typeof count === 'undefined') {
    count = Number(line);
  } else {
    strings.push(line);
    if (strings.length === count) {
      rl.close();
    }
  }
}).on('close', () => {
  for (const string of strings) {
    solution(string);
  }
  process.exit();
});
