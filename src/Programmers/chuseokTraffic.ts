import {} from 'module';

const solution = (lines: string[]): number => {
  /**
   *
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
  for (let index = 0; index < size; index++) {
    let startNum = 1;
    let endNum = 1;
    const [start, end] = modified[index];
    for (let count = 1; count < size; count++) {
      const [s, e] = modified[(index + count) % size];
      if (start <= e && start + 999 >= e) {
        startNum += 1;
      }
      if (start <= s && start + 999 >= s) {
        startNum += 1;
      }
      if (s < start && start + 999 < e) {
        startNum += 1;
      }
      if (end <= e && end + 999 >= e) {
        endNum += 1;
      }
      if (end <= s && end + 999 >= s) {
        endNum += 1;
      }
      if (s < end && end + 999 < e) {
        endNum += 1;
      }
    }
    if (Math.max(startNum, endNum) > answer) {
      answer = Math.max(startNum, endNum);
    }
  }
  return answer;
};
