import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const [N, K] = readFileSync(source)
  .toString()
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = (N: number, K: number) => {
  const used = new Array<boolean>(N).fill(false);
  const permutaion: number[] = [];
  let loc = -1;
  while (permutaion.length !== N) {
    let count = 0;
    while (count < K) {
      loc = (loc + 1) % N;
      if (!used[loc]) {
        count += 1;
      }
    }
    used[loc] = true;
    permutaion.push(loc + 1);
  }
  console.log(`<${permutaion.join(', ')}>`);
};

solution(N, K);
