import {} from 'module';

const solution = (stones: number[], k: number) => {
  let low = Infinity;
  let high = -Infinity;
  for (const value of stones) {
    if (value > high) {
      high = value;
    }
    if (value < low) {
      low = value;
    }
  }
  let answer = 0;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let count = 0;
    for (const value of stones) {
      if (value - mid <= 0) {
        count += 1;
        if (count === k) {
          answer = mid;
          break;
        }
      } else {
        count = 0;
      }
    }
    if (answer === mid) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return answer;
};
