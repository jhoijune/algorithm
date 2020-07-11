import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const matrixSum = (
  arr: number[][],
  row1: number,
  col1: number,
  row2: number,
  col2: number
) => {
  let result = 0;
  for (let row = row1; row < row2; row++) {
    for (let col = col1; col < col2; col++) {
      result += arr[row][col];
    }
  }
  return result;
};

const trisectionCase1 = (
  arr: number[][],
  row: number,
  col: number,
  rowLen: number,
  colLen: number
) => {
  const sum1 = matrixSum(arr, 0, 0, row + 1, col + 1);
  const sum2 = matrixSum(arr, 0, col + 1, row + 1, colLen);
  const sum3 = matrixSum(arr, row + 1, 0, rowLen, colLen);
  return sum1 * sum2 * sum3;
};

const trisectionCase2 = (
  arr: number[][],
  row: number,
  col: number,
  rowLen: number,
  colLen: number
) => {
  const sum1 = matrixSum(arr, 0, 0, rowLen, col + 1);
  const sum2 = matrixSum(arr, 0, col + 1, row + 1, colLen);
  const sum3 = matrixSum(arr, row + 1, col + 1, rowLen, colLen);
  return sum1 * sum2 * sum3;
};

const trisectionCase3 = (
  arr: number[][],
  row: number,
  col: number,
  rowLen: number,
  colLen: number
) => {
  const sum1 = matrixSum(arr, 0, 0, row + 1, colLen);
  const sum2 = matrixSum(arr, row + 1, 0, rowLen, col + 1);
  const sum3 = matrixSum(arr, row + 1, col + 1, rowLen, colLen);
  return sum1 * sum2 * sum3;
};

const trisectionCase4 = (
  arr: number[][],
  row: number,
  col: number,
  rowLen: number,
  colLen: number
) => {
  const sum1 = matrixSum(arr, 0, 0, row + 1, col + 1);
  const sum2 = matrixSum(arr, row + 1, 0, rowLen, col + 1);
  const sum3 = matrixSum(arr, 0, col + 1, rowLen, colLen);
  return sum1 * sum2 * sum3;
};

const solution = (arr: number[][]) => {
  const rowLen = arr.length;
  const colLen = arr[0].length;
  let answer = -Infinity;
  if (rowLen >= 3) {
    for (let rowUp = 0; rowUp < rowLen - 2; rowUp++) {
      const up = matrixSum(arr, 0, 0, rowUp + 1, colLen);
      for (let rowMiddle = rowUp + 1; rowMiddle < rowLen - 1; rowMiddle++) {
        const mid = matrixSum(arr, rowUp + 1, 0, rowMiddle + 1, colLen);
        const down = matrixSum(arr, rowMiddle + 1, 0, rowLen, colLen);
        answer = Math.max(answer, up * mid * down);
      }
    }
  }
  if (colLen >= 3) {
    for (let colLeft = 0; colLeft < colLen - 2; colLeft++) {
      const left = matrixSum(arr, 0, 0, rowLen, colLeft + 1);
      for (let colMid = colLeft + 1; colMid < colLen - 1; colMid++) {
        const mid = matrixSum(arr, 0, colLeft + 1, rowLen, colMid + 1);
        const right = matrixSum(arr, 0, colMid + 1, rowLen, colLen);
        answer = Math.max(answer, left * mid * right);
      }
    }
  }
  if (colLen >= 2 && rowLen >= 2) {
    for (let row = 0; row < rowLen - 1; row++) {
      for (let col = 0; col < colLen - 1; col++) {
        answer = Math.max(
          answer,
          trisectionCase1(arr, row, col, rowLen, colLen),
          trisectionCase2(arr, row, col, rowLen, colLen),
          trisectionCase3(arr, row, col, rowLen, colLen),
          trisectionCase4(arr, row, col, rowLen, colLen)
        );
      }
    }
  }
  console.log(answer);
};

let rowLen = 0;
let colLen = 0;

const arr: number[][] = [];

rl.on('line', (line) => {
  if (rowLen === 0 && colLen === 0) {
    const [row, col] = line.split(' ');
    rowLen = Number(row);
    colLen = Number(col);
  } else {
    const container = line.split('').map((v) => Number(v));
    arr.push(container);
    if (arr.length === rowLen) {
      rl.close();
    }
  }
}).on('close', () => {
  solution(arr);
  process.exit();
});
