import { size } from 'lodash';
import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const N = Number(input[0]);
const inCar = input.slice(1, N + 1).map((v) => v.trim());
const outCar = input.slice(N + 1).map((v) => v.trim());

const solution = (inCar: string[], outCar: string[]) => {
  const N = outCar.length;
  const map = new Map<string, number>();
  for (let index = 0; index < N; index++) {
    map.set(inCar[index], index);
  }
  let answer = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (map.get(outCar[i])! > map.get(outCar[j])!) {
        answer += 1;
        break;
      }
    }
  }
  console.log(answer);
};

solution(inCar, outCar);
