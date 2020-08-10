const maximalSquare = function (matrix: string[][]): number {
  const N = matrix.length;
  if (N === 0) {
    return 0;
  }
  const M = matrix[0].length;
  const table = Array.from(Array(N), () => new Array<number>(M).fill(0));
  let maxLen = 0;
  for (let row = 0; row < N; row++) {
    if (matrix[row][0] === '1') {
      table[row][0] = 1;
      maxLen = 1;
    }
  }
  for (let col = 0; col < M; col++) {
    if (matrix[0][col] === '1') {
      table[0][col] = 1;
      maxLen = 1;
    }
  }
  for (let row = 1; row < N; row++) {
    for (let col = 1; col < M; col++) {
      if (matrix[row][col] === '1') {
        table[row][col] =
          Math.min(
            table[row - 1][col - 1],
            table[row - 1][col],
            table[row][col - 1]
          ) + 1;
        maxLen = Math.max(maxLen, table[row][col]);
      }
    }
  }
  return maxLen * maxLen;
};
