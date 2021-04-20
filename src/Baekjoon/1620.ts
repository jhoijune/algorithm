import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [N, M] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const encyclopediaNum = new Array<string>(N);
const encyclopediaName = new Map<string, number>();

let index = 1;
for (let curr = 0; curr < N; curr++) {
  const name = input[index++].trim();
  encyclopediaNum[curr] = name;
  encyclopediaName.set(name, curr + 1);
}
for (let curr = 0; curr < M; curr++) {
  const unknown = input[index++].trim();
  const num = Number.parseInt(unknown);
  if (Number.isNaN(num)) {
    console.log(encyclopediaName.get(unknown));
  } else {
    console.log(encyclopediaNum[num - 1]);
  }
}
