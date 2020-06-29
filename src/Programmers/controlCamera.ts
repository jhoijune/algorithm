import {} from 'module';

const solution = (routes: [number, number][]): number => {
  /**
   * 단속 카메라
   * time complexity: O(nlogn)
   * space complexity: O(n)
   */
  const sorted = [...routes].sort(([a], [b]) => a - b);
  let answer = 1;
  const overlap = [-Infinity, Infinity];
  for (const [start, end] of sorted) {
    overlap[0] = start;
    if (overlap[1] < start) {
      answer += 1;
      overlap[1] = end;
    } else if (overlap[1] >= end) {
      overlap[1] = end;
    }
  }
  return answer;
};
