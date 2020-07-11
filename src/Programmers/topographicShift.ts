import {} from 'module';

const solution = (land: number[][], height: number): number => {
  /**
   * 지형 이동
   */
  const N = land.length;
  const visited = Array.from(Array(N), () => new Array<boolean>(N).fill(false));
  let answer = 0;
  let start: [number, number] = [0, 0];
  let count = 0;

  const dRow = [0, 1, 0, -1];
  const dCol = [1, 0, -1, 0];

  const dfs = (row: number, col: number) => {
    count += 1;
    for (let i = 0; i < 4; i++) {
      const newRow = row + dRow[i];
      const newCol = col + dCol[i];
      if (
        newRow >= 0 &&
        newRow < N &&
        newCol >= 0 &&
        newCol < N &&
        !visited[newRow][newCol]
      ) {
        const value = Math.abs(land[row][col] - land[newRow][newCol]);
        if (value <= height) {
          visited[newRow][newCol] = true;
          dfs(newRow, newCol);
        }
      }
    }
  };

  const findStart = () => {
    let cost = Infinity;
    let point: [number, number] | null = null;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (visited[row][col]) {
          for (let i = 0; i < 4; i++) {
            const newRow = row + dRow[i];
            const newCol = col + dCol[i];
            if (
              newRow >= 0 &&
              newRow < N &&
              newCol >= 0 &&
              newCol < N &&
              !visited[newRow][newCol]
            ) {
              const value = Math.abs(land[row][col] - land[newRow][newCol]);
              if (value < cost) {
                cost = value;
                point = [newRow, newCol];
              }
            }
          }
        }
      }
    }
    if (point !== null) {
      start = point;
      answer += cost;
    }
  };

  while (count < N * N) {
    visited[start[0]][start[1]] = true;
    dfs(start[0], start[1]);
    findStart();
  }
  return answer;
};
