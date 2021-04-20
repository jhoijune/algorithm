const uniquePathsWithObstacles = function (obstacleGrid: number[][]) {
  const EMPTY = 0;
  const OBSTACLE = 1;
  const M = obstacleGrid.length;
  const N = obstacleGrid[0].length;
  const dp = Array.from(Array(M), () => new Array<number>(N).fill(0));
  const dr = [0, -1];
  const dc = [-1, 0];
  let curr = 0;
  while (curr < M && obstacleGrid[curr][0] === EMPTY) {
    dp[curr][0] = 1;
    curr += 1;
  }
  curr = 0;
  while (curr < N && obstacleGrid[0][curr] === EMPTY) {
    dp[0][curr] = 1;
    curr += 1;
  }
  for (let row = 1; row < M; row++) {
    for (let col = 1; col < N; col++) {
      if (obstacleGrid[row][col] === OBSTACLE) {
        continue;
      }
      for (let dir = 0; dir < 2; dir++) {
        const nr = row + dr[dir];
        const nc = col + dc[dir];
        if (nr >= 0 && nc >= 0) {
          dp[row][col] += dp[nr][nc];
        }
      }
    }
  }
  return dp[M - 1][N - 1];
};
