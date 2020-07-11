import {} from 'module';

const solution = (n: number, stations: number[], w: number) => {
  /**
   * 기지국 설치
   * time complexity: O(n)
   */
  const size = stations.length;
  let answer = 0;
  for (let index = 0; index < size; index++) {
    if (index === 0) {
      let value = stations[index] - w - 1;
      value = value > 0 ? value : 0;
      answer += Math.ceil(value / (2 * w + 1));
    }
    if (index === size - 1) {
      let value = n - stations[index] - w;
      value = value > 0 ? value : 0;
      answer += Math.ceil(value / (2 * w + 1));
    } else {
      let value = stations[index + 1] - stations[index] - (2 * w + 1);
      value = value > 0 ? value : 0;
      answer += Math.ceil(value / (2 * w + 1));
    }
  }
  return answer;
};

console.log(solution(16, [9], 2));
