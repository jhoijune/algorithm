import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [, K] = input[0].trim().split(' ');
const words: string[] = [];

for (let index = 1; index < input.length; index++) {
  words.push(input[index].trim());
}

const solution = (words: string[], K: number) => {
  const diff = K - 5;
  const a_CODE = 'a'.charCodeAt(0);
  const used = new Array<boolean>(26).fill(false);
  for (const char of 'acint') {
    const index = char.charCodeAt(0) - a_CODE;
    used[index] = true;
  }
  let answer = 0;
  const dfs = (num: number, start: number) => {
    if (num === 0) {
      let count = 0;
      for (const word of words) {
        const size = word.length;
        let index = 0;
        while (index < size) {
          const char = word[index];
          const code = char.charCodeAt(0) - a_CODE;
          if (used[code]) {
            index += 1;
          } else {
            break;
          }
        }
        if (index === size) {
          count += 1;
        }
      }
      answer = Math.max(count, answer);
      return;
    } else {
      for (let index = start; index < 26; index++) {
        if (!used[index]) {
          used[index] = true;
          dfs(num - 1, start + 1);
          used[index] = false;
        }
      }
    }
  };
  dfs(diff, 0);
  console.log(answer);
};

solution(words, Number(K));
