import {} from 'module';

const solution = (n: number) => {
  /**
   * 정수 제곱근 판별
   * time complexity: O(1)
   */
  const sqrt = Math.sqrt(n);
  if (Number.isInteger(sqrt)) {
    return Math.pow(sqrt + 1, 2);
  }
  return -1;
};
