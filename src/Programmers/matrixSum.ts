import {} from 'module';

const solution = (arr1: number[][], arr2: number[][]): number[][] => {
  /**
   * 행렬의 덧셈
   * time complexity: O(n*m)
   * space complexity: O(n*m)
   */
  const row = arr1.length;
  const col = arr1[0].length;
  const answer = Array.from(Array(row), () => new Array<number>(col).fill(0));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      answer[i][j] = arr1[i][j] + arr2[i][j];
    }
  }
  return answer;
};
