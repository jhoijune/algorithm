import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const limits = readFileSync(source)
  .toString()
  .trim()
  .split(' ')
  .map((v) => Number(v)) as [number, number, number];

const solution = (limits: [number, number, number]) => {
  const stateSet = new Set<string>();
  const volumes = new Set<number>();
  volumes.add(limits[2]);
  let queue: [number, number, number][] = [[0, 0, limits[2]]];

  const pourWater = (
    bucket: [number, number, number],
    source: number,
    target: number
  ) => {
    const newBucket = [...bucket] as [number, number, number];
    if (bucket[target] + bucket[source] > limits[target]) {
      newBucket[target] = limits[target];
      newBucket[source] -= limits[target] - bucket[target];
    } else {
      newBucket[target] += newBucket[source];
      newBucket[source] = 0;
    }
    return newBucket;
  };

  const createKey = (input: [number, number, number]): string =>
    input.join(' ');
  stateSet.add(createKey(queue[0]));
  while (queue.length !== 0) {
    const newQueue: [number, number, number][] = [];
    for (const bucket of queue) {
      for (let source = 0; source < 3; source++) {
        if (bucket[source] === 0) {
          continue;
        }
        for (let target = 0; target < 3; target++) {
          if (source === target) {
            continue;
          }
          const newBucket = pourWater(bucket, source, target);
          const key = createKey(newBucket);
          if (!stateSet.has(key)) {
            stateSet.add(key);
            if (newBucket[0] === 0) {
              volumes.add(newBucket[2]);
            }
            newQueue.push(newBucket);
          }
        }
      }
    }
    queue = newQueue;
  }
  console.log([...volumes.keys()].sort((a, b) => a - b).join(' '));
};

solution(limits);
