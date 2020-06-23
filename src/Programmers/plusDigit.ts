import {} from 'module';

const solution = (n: number): number => {
  /**
   * 자릿수 더하기
   * time complexity: O(k) (n의 길이)
   */
  let sum = 0;
  const string = String(n);
  for (const num of string) {
    sum += Number(num);
  }
  return sum;
};
