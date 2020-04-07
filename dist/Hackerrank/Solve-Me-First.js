'use strict';
process.stdin.resume();
process.stdin.setEncoding('utf8');
const solveMeFirst = (a, b) => a + b;
let input = '';
process.stdin.on('data', (data) => {
  input += data;
});
process.stdin.on('end', () => {
  const lines = input.split('\n');
  const a = parseInt(lines[0], 10);
  const b = parseInt(lines[1], 10);
  const result = solveMeFirst(a, b);
  console.log(result);
});
