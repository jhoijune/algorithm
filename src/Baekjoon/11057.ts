import { readFileSync } from 'fs';
const input = Number(readFileSync('/dev/stdin').toString());

const solution = (num: number) => {
  let aux = new Array<number>(10).fill(1);
  let count = 1;
  while (count < num) {
    const newAux = new Array<number>(10).fill(0);
    for (let i = 0; i < 10; i++) {
      for (let j = i; j < 10; j++) {
        newAux[j] = newAux[j] + aux[i];
      }
    }
    aux = newAux;
    count += 1;
  }
  console.log(aux.reduce((prev, curr) => prev + curr, 0));
};

solution(input);
