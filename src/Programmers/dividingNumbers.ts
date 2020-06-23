import {} from 'module';

const solution = (arr: number[], divisor: number): number[] => {
  /**
   * 나누어 떨어지는 숫자 배열
   * time complexity: O(nlogn)
   * space complexity: O(n)
   */
  const answer: number[] = [];
  for (const value of arr) {
    if (value % divisor === 0) {
      answer.push(value);
    }
  }
  answer.sort((a, b) => a - b);
  return answer.length === 0 ? [-1] : answer;
};
