const spiralOrder = function (matrix: number[][]): number[] {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  const answer: number[] = [];
  const visited = Array.from(Array(rowLen), () =>
    new Array<boolean>(colLen).fill(false)
  );
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let row = 0;
  let col = 0;
  let dir = 0;
  while (answer.length !== rowLen * colLen) {
    answer.push(matrix[row][col]);
    visited[row][col] = true;
    if (
      row + dr[dir] < 0 ||
      row + dr[dir] >= rowLen ||
      col + dc[dir] < 0 ||
      col + dc[dir] >= colLen ||
      visited[row + dr[dir]][col + dc[dir]]
    ) {
      dir = (dir + 1) % 4;
    }
    row = row + dr[dir];
    col = col + dc[dir];
  }
  return answer;
};
