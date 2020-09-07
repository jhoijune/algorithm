import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [r, c, k] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const A: number[][] = [];
for (let index = 1; index < 4; index++) {
  A.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = function (A: number[][], r: number, c: number, k: number) {
  let board: number[][] = [];
  for (let index = 0; index < 3; index++) {
    board.push([...A[index]]);
  }

  const sort = function (arr: [number, number][]) {
    const size = arr.length;
    for (let end = size - 1; end > 0; end--) {
      for (let start = 0; start < end; start++) {
        if (arr[start][1] < arr[start + 1][1]) {
          continue;
        } else if (arr[start][1] > arr[start + 1][1]) {
          const temp = arr[start + 1];
          arr[start + 1] = arr[start];
          arr[start] = temp;
        } else if (arr[start][0] < arr[start + 1][0]) {
          continue;
        } else if (arr[start][0] > arr[start + 1][0]) {
          const temp = arr[start + 1];
          arr[start + 1] = arr[start];
          arr[start] = temp;
        }
      }
    }
  };

  const operationR = function (board: number[][]): number[][] {
    const rowLen = board.length;
    const colLen = board[0].length;
    const newBoard: number[][] = [];
    let maxLen = 0;
    for (let row = 0; row < rowLen; row++) {
      const countMap = new Map<number, number>();
      for (let col = 0; col < colLen; col++) {
        const num = board[row][col];
        if (num === 0) {
          continue;
        }
        const ex = countMap.get(num);
        if (typeof ex === 'undefined') {
          countMap.set(num, 1);
        } else {
          countMap.set(num, ex + 1);
        }
      }
      const arr: [number, number][] = [];
      for (const [num, count] of countMap) {
        arr.push([num, count]);
      }
      sort(arr);
      const flattened = arr.flat().slice(0, 100);
      newBoard.push(flattened);
      maxLen = Math.max(maxLen, newBoard[row].length);
    }
    for (let row = 0; row < rowLen; row++) {
      const diff = maxLen - newBoard[row].length;
      for (let _ = 0; _ < diff; _++) {
        newBoard[row].push(0);
      }
    }
    return newBoard;
  };

  const operationC = function (board: number[][]): number[][] {
    const rowLen = board.length;
    const colLen = board[0].length;
    const newBoard: number[][] = [];
    let maxLen = 0;
    for (let col = 0; col < colLen; col++) {
      const countMap = new Map<number, number>();
      for (let row = 0; row < rowLen; row++) {
        const num = board[row][col];
        if (num === 0) {
          continue;
        }
        const ex = countMap.get(num);
        if (typeof ex === 'undefined') {
          countMap.set(num, 1);
        } else {
          countMap.set(num, ex + 1);
        }
      }
      const arr: [number, number][] = [];
      for (const [num, count] of countMap) {
        arr.push([num, count]);
      }
      sort(arr);
      const flattened = arr.flat().slice(0, 100);
      const size = flattened.length;
      maxLen = Math.max(maxLen, size);
      for (let row = 0; row < size; row++) {
        if (row === newBoard.length) {
          newBoard[row] = [];
        }
        newBoard[row][col] = flattened[row];
      }
    }
    for (let col = 0; col < colLen; col++) {
      for (let row = 0; row < maxLen; row++) {
        if (typeof newBoard[row][col] === 'undefined') {
          newBoard[row][col] = 0;
        }
      }
    }
    return newBoard;
  };

  let time = 0;
  while (time <= 100) {
    if (
      r <= board.length &&
      c <= board[0].length &&
      board[r - 1][c - 1] === k
    ) {
      console.log(time);
      return;
    }
    if (board.length >= board[0].length) {
      board = operationR(board);
    } else {
      board = operationC(board);
    }
    time += 1;
  }
  console.log(-1);
};

solution(A, r, c, k);
