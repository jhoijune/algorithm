import {} from 'module';

const solution = (board: number[][], moves: number[]): number => {
  /**
   * 크레인 인형뽑기 게임
   *  board의 높이: h, moves의 크기:n
   *  time complexity: O(n*h)
   *  space complexity: O(n)
   */
  const height = board.length;
  const bucket: number[] = [];
  let result = 0;
  for (const move of moves) {
    let curr = 0;
    while (curr < height && board[curr][move - 1] === 0) {
      curr += 1;
    }
    if (curr !== height) {
      const value = board[curr][move - 1];
      if (bucket.length !== 0 && bucket[bucket.length - 1] === value) {
        bucket.pop();
        result += 2;
      } else {
        bucket.push(value);
      }
      board[curr][move - 1] = 0;
    }
  }
  return result;
};
