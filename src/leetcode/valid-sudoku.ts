const isValidSudoku = function (board: string[][]): boolean {
  const rows = Array.from(Array<Set<number>>(9), () => new Set<number>());
  const cols = Array.from(Array<Set<number>>(9), () => new Set<number>());
  const boxes = Array.from(Array<Set<number>>(9), () => new Set<number>());
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = parseInt(board[row][col]);
      if (isNaN(num)) {
        continue;
      }
      if (rows[row].has(num)) {
        return false;
      }
      rows[row].add(num);
      if (cols[col].has(num)) {
        return false;
      }
      cols[col].add(num);
      const box = 3 * Math.floor(row / 3) + Math.floor(col / 3);
      if (boxes[box].has(num)) {
        return false;
      }
      boxes[box].add(num);
    }
  }
  return true;
};
