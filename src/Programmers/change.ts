import {} from 'module';

const solution = (n: number, money: number[]): number => {
  /**
   * 거스름돈
   */
  let answer = 1;
  money.sort((a, b) => b - a);
  const min = money.pop()!;
  for (let curr = min + 1; curr <= n; curr++) {
    let inc = 0;
    for (const mon of money) {
      if (curr % mon === 0) {
        inc += 1;
      }
    }
    answer += inc;
  }
  return answer % 1000000007;
};
