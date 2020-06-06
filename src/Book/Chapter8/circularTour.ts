/*
There are N number of petrol pumps in a circular path. Each petrol pump has some limited
amount of petrol. You are given the amount of petrol each petrol pump has and the distance from next
petrol pump. Find if there is a circular tour possible to visit all the petrol pumps.
*/

import { ArrayQueue } from '../../DataStructure';

const circularTour = (input: [number, number][]): number => {
  const size = input.length;
  const queue = new ArrayQueue<number>();
  let nextPump = 0;
  let count = 0;
  let petrol = 0;
  while (queue.size() !== size) {
    while (petrol >= 0 && queue.size() !== size) {
      queue.enqueue(nextPump);
      petrol += input[nextPump][0] - input[nextPump][1];
      nextPump = (nextPump + 1) % size;
    }
    while (petrol < 0 && !queue.isEmpty()) {
      const prevPump = queue.dequeue()!;
      petrol -= input[prevPump][0] - input[prevPump][1];
    }
    count += 1;
    if (count === size) {
      return -1;
    }
  }
  if (petrol >= 0) {
    return queue.dequeue()!;
  }
  return -1;
};

(() => {
  const tour: [number, number][] = [
    [8, 6],
    [1, 4],
    [7, 6],
  ];
  console.log(circularTour(tour));
})();
