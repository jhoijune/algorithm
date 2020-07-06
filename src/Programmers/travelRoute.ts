import {} from 'module';

const solution = (tickets: [string, string][]): string[] => {
  /**
   * 여행 경로
   * time complexity: O(n^2)
   * space complexity: O(n)
   */
  tickets.sort(([, a], [, b]) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  });
  const size = tickets.length;
  const used = new Array<boolean>(size).fill(false);
  let answer = ['ICN'];

  const dfs = (start: string) => {
    if (answer.length === size + 1) {
      return;
    }
    for (let index = 0; index < size; index++) {
      if (!used[index]) {
        const [src, dst] = tickets[index];
        if (src === start) {
          used[index] = true;
          answer.push(dst);
          dfs(dst);
          if (answer.length === size + 1) {
            return;
          }
          used[index] = false;
          answer.pop();
        }
      }
    }
  };
  dfs('ICN');
  return answer;
};
