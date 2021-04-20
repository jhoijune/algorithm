const permuteUnique = function (nums: number[]) {
  const size = nums.length;
  const candidates: number[][] = [];
  const visited = new Array<boolean>(size).fill(false);
  const util = function (curr: number[]) {
    if (curr.length === size) {
      candidates.push([...curr]);
      return;
    }
    for (let index = 0; index < size; index++) {
      if (!visited[index]) {
        visited[index] = true;
        curr.push(nums[index]);
        util(curr);
        visited[index] = false;
        curr.pop();
      }
    }
  };
  util([]);
  const answer: number[][] = [];
  const set = new Set<string>();
  for (const candidate of candidates) {
    const stringified = candidate.join();
    if (!set.has(stringified)) {
      answer.push(candidate);
      set.add(stringified);
    }
  }
  return answer;
};
