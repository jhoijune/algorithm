import { readFileSync } from 'fs';
const input = readFileSync('/dev/stdin').toString();

const solution = (str: string) => {
  const a_CODE = 'a'.charCodeAt(0);
  const A_CODE = 'A'.charCodeAt(0);
  const answer: string[] = [];
  for (const char of str) {
    const code = char.charCodeAt(0);
    if (/[a-z]/.test(char)) {
      const loc = (code + 13 - a_CODE) % 26;
      answer.push(String.fromCharCode(loc + a_CODE));
    } else if (/[A-Z]/.test(char)) {
      const loc = (code + 13 - A_CODE) % 26;
      answer.push(String.fromCharCode(loc + A_CODE));
    } else {
      answer.push(char);
    }
  }
  console.log(answer.join(''));
};

solution(input);
