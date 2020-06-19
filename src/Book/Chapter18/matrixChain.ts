import { createRandomArray } from '../../Util';

const matrixChain = (d: number[]) => {
  const size = d.length - 1;
  const N = Array.from(Array<number>(size), () =>
    new Array<number>(size).fill(0)
  );
  for (let length = 1; length < size; length++) {
    for (let start = 0; start < size - length; start++) {
      let minCount = Infinity;
      for (let middle = 0; middle < length; middle++) {
        const leftCount = N[start][start + middle];
        const rightCount = N[start + middle + 1][start + length];
        const opreationCount =
          d[start] * d[start + middle + 1] * d[start + length + 1];
        const sum = leftCount + rightCount + opreationCount;
        if (sum < minCount) {
          minCount = sum;
        }
      }
      N[start][start + length] = minCount;
    }
  }
  return N[0][size - 1];
};

(() => {
  const d = [4, 10, 3, 12, 20, 7];
  console.log(matrixChain(d));
})();
