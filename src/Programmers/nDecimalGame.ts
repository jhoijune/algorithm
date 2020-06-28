import {} from 'module';

const solution = (n: number, t: number, m: number, p: number) => {
  /**
   * n진수 게임
   * time complexity: O(mt)
   * space complexity: O(mt)
   */
  let concat = '';
  const limit = m * (t - 1) + p;
  let number = 0;
  while (concat.length < limit) {
    concat += number.toString(n);
    number += 1;
  }
  let answer = '';
  for (let count = 0; count < t; count++) {
    answer += concat[m * count + p - 1];
  }
  return answer.toUpperCase();
};
