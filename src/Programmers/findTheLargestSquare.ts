import {} from 'module';

const solution = (board: number[][]) => {
  /**
   * 가장 큰 정사각형 찾기
   * time complexity: O(n*m)
   * TODO: 다시 보기 DP
   */
  const row = board.length;
  const col = board[0].length;
  let max = Math.max(
    board[0][0],
    col > 1 ? board[0][1] : 0,
    row > 1 ? board[1][0] : 0
  );
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (board[i][j] !== 0) {
        board[i][j] =
          Math.min(board[i - 1][j - 1], board[i - 1][j], board[i][j - 1]) + 1;
        max = Math.max(max, board[i][j]);
      }
    }
  }
  return max * max;
};
