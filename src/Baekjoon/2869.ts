import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const [A, B, V] = readFileSync(source)
  .toString()
  .trim()
  .split(' ')
  .map((v) => Number(v));

console.log(Math.ceil((V - B) / (A - B)));
