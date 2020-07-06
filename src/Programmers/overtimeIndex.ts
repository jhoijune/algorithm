import {} from 'module';

const solution = (n: number, works: number[]): number => {
  const size = works.length;
  works.sort((a, b) => b - a);
  let point = 1;
  while (n !== 0 && works[size - 1] !== 0) {
    if (point === size) {
      for (let index = 0; index < point; index++) {
        if (n !== 0 && works[index] > 0) {
          works[index] -= 1;
          n -= 1;
        }
      }
    } else {
      while (n !== 0 && works[0] > works[point]) {
        for (let index = 0; index < point; index++) {
          if (n !== 0) {
            works[index] -= 1;
            n -= 1;
          }
        }
      }
      point += 1;
    }
  }
  return works.reduce((prev, curr) => prev + curr ** 2, 0);
};
