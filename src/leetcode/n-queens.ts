const solveNQueens = function (n: number): string[][] {
  const answer: string[][] = [];
  const DFS = function (curr: number[]) {
    if (curr.length === n) {
      const board: string[] = [];
      for (const num of curr) {
        const row = '.'.repeat(num) + 'Q' + '.'.repeat(n - num - 1);
        board.push(row);
      }
      answer.push(board);
      return;
    }
    const size = curr.length;
    for (let num = 0; num < n; num++) {
      let index = 0;
      while (
        index < size &&
        curr[index] !== num &&
        num + size - index !== curr[index] &&
        num - size + index !== curr[index]
      ) {
        index += 1;
      }
      if (index === size) {
        curr.push(num);
        DFS(curr);
        curr.pop();
      }
    }
  };
  DFS([]);
  return answer;
};

console.log(solveNQueens(4));
