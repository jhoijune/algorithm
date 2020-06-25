import {} from 'module';

const solution = (A: number[], B: number[]): number => {
  /**
   * 최솟값 만들기
   * time complexity: O(nlogn)
   */
  const size = A.length;
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);
  let sum = 0;
  for (let index = 0; index < size; index++) {
    sum += A[index] * B[size - index - 1];
  }
  return sum;
};
