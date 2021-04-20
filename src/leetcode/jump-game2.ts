const jump = function (nums: number[]): number {
  const size = nums.length;
  const visited = new Array<boolean>(size).fill(false);
  visited[0] = true;
  let queue = [0];
  let count = 0;
  while (!visited[size - 1]) {
    const newQueue: number[] = [];
    count += 1;
    for (const index of queue) {
      const num = nums[index];
      for (
        let curr = Math.min(index + num, size - 1);
        curr >= 0 && curr >= index - num;
        curr--
      ) {
        if (!visited[curr]) {
          newQueue.push(curr);
          visited[curr] = true;
        }
      }
    }
    queue = newQueue;
  }
  return count;
};
