import { cpuUsage } from 'process';

const generateMatrix = function (n: number): number[][] {
  const NONE = -1;
  const matrix = Array.from(Array(n), () => new Array<number>(n).fill(NONE));
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let dir = 0;
  let row = 0;
  let col = 0;
  let num = 1;
  while (num <= n * n) {
    matrix[row][col] = num;
    if (
      row + dr[dir] < 0 ||
      row + dr[dir] >= n ||
      col + dc[dir] < 0 ||
      col + dc[dir] >= n ||
      matrix[row + dr[dir]][col + dc[dir]] !== NONE
    ) {
      dir = (dir + 1) % 4;
    }
    row += dr[dir];
    col += dc[dir];
    num += 1;
  }
  return matrix;
};
