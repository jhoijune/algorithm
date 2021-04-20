import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const notHear = new Set<string>();
const notHearAndnotWatch: string[] = [];

const [N, M] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
let index = 1;

for (let count = 0; count < N; count++) {
  notHear.add(input[index++].trim());
}

for (let count = 0; count < M; count++) {
  const name = input[index++].trim();
  if (notHear.has(name)) {
    notHearAndnotWatch.push(name);
  }
}

notHearAndnotWatch.sort();
console.log(notHearAndnotWatch.length);
for (const name of notHearAndnotWatch) {
  console.log(name);
}
