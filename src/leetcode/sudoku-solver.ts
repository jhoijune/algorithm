const solveSudoku = function (board: string[][]) {
  const indexes: [number, number][] = [];
  const rows = Array.from(Array(9), () => new Array<boolean>(9).fill(false));
  const cols = Array.from(Array(9), () => new Array<boolean>(9).fill(false));
  const boxes = Array.from(Array(9), () => new Array<boolean>(9).fill(false));
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = parseInt(board[row][col]);
      if (isNaN(num)) {
        indexes.push([row, col]);
        continue;
      }
      rows[row][num - 1] = true;
      cols[col][num - 1] = true;
      const box = 3 * Math.floor(row / 3) + Math.floor(col / 3);
      boxes[box][num - 1] = true;
    }
  }
  const size = indexes.length;
  let solved = false;
  const DFS = function (index: number) {
    if (index === size) {
      solved = true;
      return;
    }
    const [row, col] = indexes[index];
    for (let num = 1; num < 10 && !solved; num++) {
      const box = 3 * Math.floor(row / 3) + Math.floor(col / 3);
      if (rows[row][num - 1] || cols[col][num - 1] || boxes[box][num - 1]) {
        continue;
      }
      rows[row][num - 1] = true;
      cols[col][num - 1] = true;
      boxes[box][num - 1] = true;
      board[row][col] = num.toString();
      DFS(index + 1);
      if (!solved) {
        rows[row][num - 1] = false;
        cols[col][num - 1] = false;
        boxes[box][num - 1] = false;
        board[row][col] = '.';
      } else {
        return;
      }
    }
  };
  DFS(0);
};

const board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

solveSudoku(board);

console.log(board);
