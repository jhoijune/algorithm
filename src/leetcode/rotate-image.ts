const rotate = function (matrix: number[][]) {
  const size = matrix.length;
  for (let rowStart = 0; rowStart < Math.floor(size / 2); rowStart++) {
    for (let colStart = rowStart; colStart < size - rowStart - 1; colStart++) {
      let row = rowStart;
      let col = colStart;
      let ex = matrix[rowStart][colStart];
      do {
        const [nr, nc] = [col, size - 1 - row];
        [matrix[nr][nc], ex] = [ex, matrix[nr][nc]];
        [row, col] = [nr, nc];
      } while (!(row === rowStart && col === colStart));
    }
  }
};
rotate([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
