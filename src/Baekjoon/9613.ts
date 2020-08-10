import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');
const numbersArr: number[][] = [];

for (let index = 1; index < input.length; index++) {
  numbersArr.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const calcGCD = (num1: number, num2: number): number => {
  if (num2 > num1) {
    const temp = num1;
    num1 = num2;
    num2 = temp;
  }
  while (num1 % num2 !== 0) {
    const mod = num1 % num2;
    num1 = num2;
    num2 = mod;
  }
  return num2;
};

const solution = (numbersArr: number[][]) => {
  for (const numbers of numbersArr) {
    const size = numbers.length;
    let answer = 0;
    for (let i = 1; i < size - 1; i++) {
      for (let j = i + 1; j < size; j++) {
        answer += calcGCD(numbers[i], numbers[j]);
      }
    }
    console.log(answer);
  }
};

solution(numbersArr);
