import {} from 'module';

const solution = (distance: number, rocks: number[], n: number) => {
  rocks.sort((a, b) => a - b);
  rocks.push(distance);
  let low = 1;
  let high = distance;
  let answer = 0;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let count = 0;
    let prev = 0;
    for (const rock of rocks) {
      if (rock - prev < mid) {
        count += 1;
      } else {
        prev = rock;
      }
    }
    if (count <= n) {
      answer = Math.max(answer, mid);
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return answer;
};
