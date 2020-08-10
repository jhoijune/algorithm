import {} from 'module';

const solution = (n: number, cores: number[]) => {
  const size = cores.length;
  let min = Infinity;
  let max = -Infinity;
  for (const core of cores) {
    min = Math.min(core, min);
    max = Math.max(core, max);
  }
  let low = Math.floor(((n - size) * min) / size);
  let high = Math.ceil(((n - size) * max) / size);
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let entryCount = 0;
    let count = 0;
    for (const core of cores) {
      if (mid % core === 0) {
        count += mid / core;
        entryCount += 1;
      } else {
        count += Math.floor(mid / core) + 1;
      }
    }
    if (count < n && count + entryCount >= n) {
      let match = 0;
      let index = 0;
      for (; index < size; index++) {
        if (mid % cores[index] === 0) {
          match += 1;
          if (match === n - count) {
            return index + 1;
          }
        }
      }
    } else if (count + entryCount >= n) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
};

console.log(solution(6, [1, 2, 3]));
