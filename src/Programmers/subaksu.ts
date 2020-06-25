import {} from 'module';

const solution = (n: number): string => {
  /**
   * 수박수박수박
   * time complexity: O(n)
   */
  const repeat = '수박';
  const prefix = '수';
  return repeat.repeat(Math.floor(n / 2)) + prefix.repeat(n % 2);
};
