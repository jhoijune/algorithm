const minPathSum = function (grid: number[][]) {
  const M = grid.length;
  const N = grid[0].length;
  const dp = Array.from(Array(M), () => new Array<number>(N).fill(0));
  dp[0][0] = grid[0][0];
  const dr = [-1, 0];
  const dc = [0, -1];
  for (let row = 0; row < M; row++) {
    for (let col = 0; col < N; col++) {
      if (row === 0 && col === 0) {
        continue;
      }
      let min = Infinity;
      for (let dir = 0; dir < 2; dir++) {
        const nr = row + dr[dir];
        const nc = col + dc[dir];
        if (nr >= 0 && nc >= 0) {
          min = Math.min(min, dp[nr][nc]);
        }
      }
      dp[row][col] = grid[row][col] + min;
    }
  }
  return dp[M - 1][N - 1];
};

console.log(
  minPathSum([
    [1, 2, 3],
    [4, 5, 6],
  ])
);
