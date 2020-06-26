import {} from 'module';

const solution = (n: number): number => {
  /**
   * 숫자의 표현
   * time complexity: O(n^2)
   */
  let answer = 0;
  for (let num = 1; num <= n; num++) {
    let sum = num;
    let curr = num;
    while (sum < n) {
      curr += 1;
      sum += curr;
    }
    if (sum === n) {
      answer += 1;
    }
  }
  return answer;
};
