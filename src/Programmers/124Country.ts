import {} from 'module';

const solution = (n: number): string => {
  /**
   * 124 나라의 숫자
   * time complexity: O(log3n)
   *
   */
  let answer = '';
  const mapping = ['1', '2', '4'];
  while (n !== 0) {
    const mod = (n - 1) % 3;
    answer = mapping[mod] + answer;
    n = Math.floor((n - 1) / 3);
  }
  return answer;
};
