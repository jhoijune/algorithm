import { readFileSync } from 'fs';
const [num1, num2] = readFileSync(__dirname + '\\input.txt')
  .toString()
  .trim()
  .split(' ')
  .map((v) => BigInt(v));

const calcGCD = (num1: bigint, num2: bigint): bigint => {
  if (num2 > num1) {
    const temp = num1;
    num1 = num2;
    num2 = temp;
  }
  while (num1 % num2 !== BigInt(0)) {
    const mod = num1 % num2;
    num1 = num2;
    num2 = mod;
  }
  return num2;
};

const gcd = calcGCD(num1, num2);
const ones: number[] = [];
for (let i = BigInt(0); i < gcd; i = i + BigInt(1)) {
  ones.push(1);
}
console.log(ones.join(''));
