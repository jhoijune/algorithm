import {} from 'module';

const solution = (n: number): number[] => {
  /**
   * 종이접기
   * time complexity: O(2^(n+1))
   * space compleixty: O(2^n )
   */
  const answer: number[] = [];
  for (let count = 0; count < n; count++) {
    answer.push(0);
    for (let index = answer.length - 2; index >= 0; index--) {
      if (answer[index] === 1) {
        answer.push(0);
      } else {
        answer.push(1);
      }
    }
  }
  return answer;
};
