import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (string: string) => {
  /**
   * 쇠막대기
   * time complexity: O(n)
   */
  const size = string.length;
  let answer = 0;
  let count = 0;
  let index = 0;

  while (index < size) {
    if (string[index] === '(' && string[index + 1] === ')') {
      answer += count;
      index += 2;
    } else if (string[index] === '(') {
      count += 1;
      answer += 1;
      index += 1;
    } else {
      count -= 1;
      index += 1;
    }
  }
  console.log(answer);
};

let string: string;

rl.on('line', (line) => {
  string = line;
  rl.close();
}).on('close', () => {
  solution(string);
  process.exit();
});
