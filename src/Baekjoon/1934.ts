import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const numbers: [number, number][] = [];
for (let index = 1; index < input.length; index++) {
  numbers.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v)) as [number, number]
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

const solution = (numbers: [number, number][]) => {
  for (const [num1, num2] of numbers) {
    const gcd = calcGCD(num1, num2);
    const lcm = (num1 * num2) / gcd;
    console.log(lcm);
  }
};

solution(numbers);
