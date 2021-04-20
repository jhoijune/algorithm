const combinationSum2 = function (
  candidates: number[],
  target: number
): number[][] {
  const size = candidates.length;
  candidates.sort((a, b) => a - b);
  const candAnswer: number[][] = [];
  const DFS = function (index: number, sum: number, curr: number[]) {
    if (sum === target) {
      candAnswer.push([...curr]);
      return;
    }
    if (index === size) {
      return;
    }
    if (sum + candidates[index] <= target) {
      curr.push(candidates[index]);
      DFS(index + 1, sum + candidates[index], curr);
      curr.pop();
    }
    DFS(index + 1, sum, curr);
  };
  DFS(0, 0, []);
  const set = new Set<string>();
  const answer: number[][] = [];
  for (const cand of candAnswer) {
    const stringified = cand.join();
    if (!set.has(stringified)) {
      set.add(stringified);
      answer.push(cand);
    }
  }
  return answer;
};
