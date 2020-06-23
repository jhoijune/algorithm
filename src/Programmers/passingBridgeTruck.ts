import {} from 'module';

const solution = (
  bridge_length: number,
  weight: number,
  truck_weights: number[]
) => {
  /**
   * 다리를 지나는 트럭
   * time complexity: O(n*l) (l은 다리의 길이)
   * space complexity: O(n)
   */
  const size = truck_weights.length;
  const elapsed = new Array<number>(size).fill(0);
  let time = 0;
  let start = 0;
  let count = 0;
  let currWeight = 0;
  while (elapsed[size - 1] !== bridge_length) {
    if (currWeight + truck_weights[start + count] <= weight) {
      currWeight += truck_weights[start + count];
      count += 1;
    }
    for (let i = 0; i < count; i++) {
      elapsed[start + i] = elapsed[start + i] + 1;
    }
    if (elapsed[start] === bridge_length) {
      currWeight -= truck_weights[start];
      start += 1;
      count -= 1;
    }
    time += 1;
  }
  return time + 1;
};
