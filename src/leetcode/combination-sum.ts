const combinationSum = function (
  candidates: number[],
  target: number
): number[][] {
  const size = candidates.length;
  const answer: number[][] = [];

  const DFS = function (sum: number, start: number, numbers: number[]) {
    for (let index = start; index < size; index++) {
      const num = candidates[index];
      if (sum + num === target) {
        answer.push([...numbers, num]);
      } else if (sum + num < target) {
        numbers.push(num);
        DFS(sum + num, index, numbers);
        numbers.pop();
      }
    }
  };

  DFS(0, 0, []);
  return answer;
};
