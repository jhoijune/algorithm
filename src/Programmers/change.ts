import {} from 'module';

const solution = (n: number, money: number[]): number => {
  /**
   * 거스름돈
   */
  const size = money.length;
  const set = new Set<string>();
  money.sort((a, b) => b - a);

  const DFS = function (curr: number, index: number, coins: number[]) {
    if (curr === 0) {
      set.add(coins.join(','));
      return;
    } else if (curr < 0) {
      return;
    } else if (index === size) {
      return;
    }
    DFS(curr, index + 1, coins);
    DFS(curr - money[index], index, [...coins, money[index]]);
    DFS(curr - money[index], index + 1, [...coins, money[index]]);
  };
  DFS(n, 0, []);
  return set.size % 1000000007;
};

console.log(solution(5, [1, 2, 5]));
