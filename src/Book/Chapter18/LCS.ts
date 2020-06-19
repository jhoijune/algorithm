const LCS = (x: string, y: string): number => {
  const xSize = x.length;
  const ySize = y.length;
  const L = Array.from(Array<number>(xSize + 1), () =>
    new Array<number>(ySize + 1).fill(0)
  );
  for (let i = 0; i < xSize; i++) {
    for (let j = 0; j < ySize; j++) {
      if (x[i] === x[j]) {
        L[i + 1][j + 1] = L[i][j] + 1;
      } else {
        L[i + 1][j + 1] = Math.max(L[i + 1][j], L[i][j + 1]);
      }
    }
  }
  return L[xSize][ySize];
};

const printLCS = (x: string, y: string, L: number[][]): string => {
  const solution: string[] = [];
  let i = x.length;
  let j = y.length;
  while (L[i][j] > 0) {
    if (x[i - 1] === y[j - 1]) {
      solution.push(x[i - 1]);
      i -= 1;
      j -= 1;
    } else if (L[i - 1][j] >= L[i][j - 1]) {
      i -= 1;
    } else {
      j -= 1;
    }
  }
  return solution.reverse().join('');
};
