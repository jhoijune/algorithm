import {} from 'module';

const solution = (progress: number[], speeds: number[]): number[] => {
  /**
   * 기능 개발
   * time complexity: O(n)
   */
  const size = progress.length;
  let start = 0;
  const answer: number[] = [];
  while (start !== size) {
    for (let index = start; index < size; index++) {
      const sum = progress[index] + speeds[index];
      progress[index] = sum >= 100 ? 100 : sum;
    }
    let count = 0;
    while (start !== size && progress[start] === 100) {
      count += 1;
      start += 1;
    }
    if (count !== 0) {
      answer.push(count);
    }
  }
  return answer;
};
