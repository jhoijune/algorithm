import {} from 'module';

const solution = (n: number, times: number[]): number => {
  /**
   * 입국 심사
   * time complexity: O(mlog(n*max))
   * TODO: 다시 보기
   */
  let max = -Infinity;
  for (const time of times) {
    if (time > max) {
      max = time;
    }
  }
  let left = 0;
  let right = max * n;
  let answer = Infinity;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 0;
    for (const time of times) {
      count += Math.floor(mid / time);
    }
    if (count >= n) {
      answer = Math.min(answer, mid);
      right = mid - 1;
    } else if (count < n) {
      left = mid + 1;
    }
  }
  return answer;
};
