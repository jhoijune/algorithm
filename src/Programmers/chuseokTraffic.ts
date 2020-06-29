import {} from 'module';

const solution = (lines: string[]): number => {
  /**
   * 추석 트래픽
   * time complexity: O(n^2)
   * space complexity: O(n^2)
   * TODO: 부동소수점,구간 (슬라이딩 윈도우)
   */
  const size = lines.length;
  let modified: [number, number][] = [];
  let answer = 0;
  lines.forEach((line) => {
    let [, time, elapsed] = line.split(' ');
    const [hour, minute, second, ms] = time.split(/:|\./g);
    const converted =
      Number(hour) * 3600 * 1000 +
      Number(minute) * 60 * 1000 +
      Number(second) * 1000 +
      Number(ms);
    elapsed = elapsed.replace(/\.|s/g, '').padEnd(4, '0');
    modified.push([converted - Number(elapsed) + 1, converted]);
  });
  for (let i = 0; i < size; i++) {
    for (const value of modified[i]) {
      let count = 0;
      for (let j = 0; j < size; j++) {
        const [s, e] = modified[j];
        if (
          (value <= s && value + 999 >= s) ||
          (value <= e && value + 999 >= e)
        ) {
          count += 1;
        }

        if (s < value && value + 999 < e) {
          count += 1;
        }
      }
      if (count > answer) {
        answer = count;
      }
    }
  }
  return answer;
};
