import {} from 'module';

const solution = (strs: string[], t: string): number => {
  const size = t.length;
  let queue: number[] = [];
  let count = 0;
  const used = new Array<boolean>(size + 1).fill(false);
  queue.push(0);
  while (queue.length !== 0) {
    const newQueue: number[] = [];
    for (const start of queue) {
      if (start === size) {
        return count;
      }
      for (const str of strs) {
        const end = start + str.length;
        const sliced = t.slice(start, end);
        if (str === sliced && !used[end]) {
          used[end] = true;
          newQueue.push(end);
        }
      }
    }
    queue = newQueue;
    count += 1;
  }
  return -1;
};

console.log(solution(['app', 'ap', 'p', 'l', 'e', 'ple', 'pp'], 'apple'));
