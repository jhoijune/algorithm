import {} from 'module';

const solution = (N: number, stages: number[]): number[] => {
  /**
   * 실패율
   * time complexity: O(n*m + nlogn) (m은 stages의 길이)
   * space complexity: O(n)
   */
  const rates: { stage: number; rate: number }[] = [];
  for (let stage = 1; stage <= N; stage++) {
    let reach = 0;
    let notClear = 0;
    for (const value of stages) {
      if (value >= stage) {
        reach += 1;
      }
      if (value === stage) {
        notClear += 1;
      }
    }
    rates.push({ stage, rate: reach !== 0 ? notClear / reach : 0 });
  }
  rates.sort((a, b) => {
    if (a.rate < b.rate) {
      return 1;
    } else if (a.rate > b.rate) {
      return -1;
    } else {
      return a.stage - b.stage;
    }
  });
  return rates.map(({ stage }) => stage);
};
