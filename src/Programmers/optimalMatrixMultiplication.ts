import {} from 'module';

const solution = (matrix_sizes: [number, number][]): number => {
  const size = matrix_sizes.length;
  const table = Array.from(Array(size), () => new Array<number>(size).fill(0));
  for (let len = 1; len < size; len++) {
    for (let start = 0; start < size - len; start++) {
      let min = Infinity;
      for (let middle = 0; middle < len; middle++) {
        const left = table[start][start + middle];
        const right = table[start + middle + 1][start + len];
        const operation =
          matrix_sizes[start][0] *
          matrix_sizes[start + middle][1] *
          matrix_sizes[start + len][1];
        min = Math.min(min, left + right + operation);
      }
      table[start][start + len] = min;
    }
  }
  return table[0][size - 1];
};

console.log(
  solution([
    [5, 3],
    [3, 10],
    [10, 6],
  ])
);
