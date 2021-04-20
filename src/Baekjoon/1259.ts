import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const numbers: string[] = [];

for (let line = 0; line < input.length - 1; line++) {
  numbers.push(input[line].trim());
}

const solution = function (numbers: string[]) {
  for (const number of numbers) {
    const size = number.length;
    let left = 0;
    let right = size - 1;
    while (left < right && number[left] === number[right]) {
      left += 1;
      right -= 1;
    }
    if (left >= right) {
      console.log('yes');
    } else {
      console.log('no');
    }
  }
};

solution(numbers);
