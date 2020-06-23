import {} from 'module';

const solution = (n: number): number => {
  /**
   * 약수의 합
   * time complexity: O(n)
   */
  let sum = 0;
  for (let divisor = 1; divisor <= n; divisor++) {
    if (n % divisor === 0) {
      sum += divisor;
    }
  }
  return sum;
};
