import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [len] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const chars = input[1].trim().split(' ');

const isValid = (string: string) => {
  let vowel = 0;
  let consonant = 0;
  for (const char of string) {
    switch (char) {
      case 'a':
        vowel += 1;
        break;
      case 'e':
        vowel += 1;
        break;
      case 'i':
        vowel += 1;
        break;
      case 'o':
        vowel += 1;
        break;
      case 'u':
        vowel += 1;
        break;
      default:
        consonant += 1;
    }
  }
  return vowel >= 1 && consonant >= 2;
};

const solution = (chars: string[], len: number) => {
  const size = chars.length;
  chars.sort();

  const DFS = (start: number, curr: string[]) => {
    if (curr.length === len) {
      const concat = curr.join('');
      if (isValid(concat)) {
        console.log(concat);
      }
      return;
    }
    for (let index = start; index <= size - len + curr.length; index++) {
      curr.push(chars[index]);
      DFS(index + 1, curr);
      curr.pop();
    }
  };
  DFS(0, []);
};

solution(chars, len);
