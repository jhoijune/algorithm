/*
In given 2-dimensional list. Each row and column are sorted in ascending order. How would
you find an element in it?
*/

const findElementIn2DArray = (arr: number[][], value: number) => {
  const rowSize = arr.length;
  const colSize = arr[0].length;
  let row = 0;
  let col = colSize - 1;
  while (row < rowSize && col >= 0) {
    if (arr[row][col] === value) {
      return [row, col];
    } else if (arr[row][col] > value) {
      col--;
    } else {
      row++;
    }
  }
  return [-1, -1];
};
