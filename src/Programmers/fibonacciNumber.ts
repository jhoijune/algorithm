import {} from 'module';

const solution = (n: number) => {
  /**
   * 피보나치 수
   * time complexity: O(n)
   */
  let left = 0;
  let right = 1;
  let count = 1;
  while (count < n) {
    const temp = (left % 1234567) + (right % 1234567);
    left = right;
    right = temp;
    count += 1;
  }
  return right % 1234567;
};
