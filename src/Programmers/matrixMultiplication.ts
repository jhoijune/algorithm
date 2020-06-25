import {} from 'module';

const solution = (arr1: number[][], arr2: number[][]): number[][] => {
  /**
   * 행렬의 곱셈
   * time complexity: O(IJK)
   * space complexty: O(IJ)
   */
  const row = arr1.length;
  const inter = arr1[0].length;
  const col = arr2[0].length;
  const answer = Array.from(Array(row), () => new Array<number>(col).fill(0));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let sum = 0;
      for (let k = 0; k < inter; k++) {
        sum += arr1[i][k] * arr2[k][j];
      }
      answer[i][j] = sum;
    }
  }
  return answer;
};
