import { maxHeaderSize } from 'http';

const canJump = function (nums: number[]): boolean {
  const size = nums.length;
  if (size === 0) {
    return true;
  }
  let queue = [0];
  const visited = new Array<boolean>(size).fill(false);
  visited[0] = true;
  while (queue.length !== 0) {
    const newQueue: number[] = [];
    for (const index of queue) {
      const num = nums[index];
      for (
        let curr = Math.min(size - 1, index + num);
        curr >= 0 && curr >= index - num;
        curr--
      ) {
        if (curr === size - 1) {
          return true;
        }
        if (!visited[curr]) {
          visited[curr] = true;
          newQueue.push(curr);
        }
      }
    }
    queue = newQueue;
  }
  return false;
};
