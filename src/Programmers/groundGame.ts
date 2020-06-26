import {} from 'module';

const solution = (land: [number, number, number, number][]): number => {
  /**
   * 땅따먹기
   * time complexity: O(n)
   * space complexity: O(n)
   * TODO: 다시보기 DP
   */
  const rowLen = land.length;
  const table = Array.from(Array(rowLen), () => new Array<number>(4).fill(0));
  for (let col = 0; col < 4; col++) {
    table[0][col] = land[0][col];
  }
  for (let row = 1; row < rowLen; row++) {
    for (let col = 0; col < 4; col++) {
      table[row][col] =
        land[row][col] +
        Math.max(
          table[row - 1][(col + 1) % 4],
          table[row - 1][(col + 2) % 4],
          table[row - 1][(col + 3) % 4]
        );
    }
  }
  console.log(table);
  return Math.max(
    table[rowLen - 1][0],
    table[rowLen - 1][1],
    table[rowLen - 1][2],
    table[rowLen - 1][3]
  );
};

console.log(
  solution([
    [1, 2, 3, 5],
    [5, 6, 7, 8],
    [4, 3, 2, 1],
  ])
);
