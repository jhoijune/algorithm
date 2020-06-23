import {} from 'module';

const solution = (d: number[], budget: number): number => {
  /**
   * 예산
   * time complexity: O(nlogn)
   */
  d.sort((a, b) => a - b);
  let answer = 0;
  for (const value of d) {
    budget = budget - value;
    if (budget >= 0) {
      answer += 1;
    } else {
      break;
    }
  }
  return answer;
};
