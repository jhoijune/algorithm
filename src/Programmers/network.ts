import {} from 'module';

const solution = (n: number, computers: number[][]): number => {
  /**
   * 네트워크
   * -> 연결되어 있는 노드 집합의 개수
   * time complexity: O(n^n)
   * space complexity: O(n)
   */
  let answer = 0;
  const visited = new Array(n).fill(false);
  const dfs = (src: number) => {
    if (!visited[src]) {
      visited[src] = true;
      for (let dst = 0; dst < n; dst++) {
        if (src !== dst && computers[src][dst] === 1) {
          dfs(dst);
        }
      }
    }
  };
  for (let src = 0; src < n; src++) {
    if (!visited[src]) {
      answer += 1;
      dfs(src);
    }
  }
  return answer;
};
