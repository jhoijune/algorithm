import {} from 'module';

const solution = (A: number[], B: number[]): number => {
  /**
   * 숫자게임
   * time complexity: O(nlogn)
   */
  const size = B.length;
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);
  let aIndex = size - 1;
  let bIndex = size - 1;
  let answer = 0;
  while (aIndex >= 0) {
    const a = A[aIndex];
    const b = B[bIndex];
    if (b > a) {
      bIndex--;
      answer++;
    }
    aIndex--;
  }
  return answer;
};

console.log(solution([2, 2, 2, 2], [1, 1, 1, 1]));
