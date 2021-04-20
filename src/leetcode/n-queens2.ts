const totalNQueens = function (n: number): number {
  const DFS = function (curr: number[]) {
    if (curr.length === n) {
      return 1;
    }
    const size = curr.length;
    let sum = 0;
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
        sum += DFS(curr);
        curr.pop();
      }
    }
    return sum;
  };
  return DFS([]);
};
