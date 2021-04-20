const permute = function (nums: number[]): number[][] {
  const size = nums.length;
  const answer: number[][] = [];
  const visited = new Array<boolean>(size).fill(false);
  const util = function (curr: number[]) {
    if (curr.length === size) {
      answer.push([...curr]);
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
  return answer;
};
