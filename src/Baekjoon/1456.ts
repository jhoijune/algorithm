import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const [low, high] = readFileSync(source)
  .toString()
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = (low: number, high: number) => {
  const NOTHING = 0;
  const PRIME = 1;
  const ALMOST_PRIME = 2;
  const LIMIT = Math.pow(2, 32) - 1;
  const aux = Array.from(Array(Math.ceil(high / LIMIT)), () =>
    new Array<number>(LIMIT).fill(NOTHING)
  );
  let answer = 0;
  for (let num = 2; num <= Math.floor(Math.sqrt(high)); num++) {
    if (aux[Math.floor(num / LIMIT)][num % LIMIT] === NOTHING) {
      let curr = num;
      let pow = num * num;
      while (curr <= high) {
        if (curr === pow) {
          aux[Math.floor(curr / LIMIT)][curr % LIMIT] = ALMOST_PRIME;
          pow *= num;
        } else {
          aux[Math.floor(curr / LIMIT)][curr % LIMIT] = PRIME;
        }
        curr += num;
      }
    }
  }
  for (let num = low; num <= high; num++) {
    if (aux[Math.floor(num / LIMIT)][num % LIMIT] === ALMOST_PRIME) {
      answer += 1;
    }
  }
  console.log(answer);
};

solution(low, high);
