import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const [num1, num2] = readFileSync(source)
  .toString()
  .trim()
  .split(' ')
  .map((v) => Number(v));

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

const gcd = calcGCD(num1, num2);
const lcm = (num1 * num2) / gcd;
console.log(gcd);
console.log(lcm);
