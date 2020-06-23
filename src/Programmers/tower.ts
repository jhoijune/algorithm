import {} from 'module';

const solution = (heights: number[]): number[] => {
  /**
   * 탑
   * time complexity: O(n^2)
   * space complexity: O(n)
   */
  const size = heights.length;
  const answer: number[] = [];
  for (let index = 0; index < size; index++) {
    const height = heights[index];
    let num = index - 1;
    while (num >= 0 && height >= heights[num]) {
      num -= 1;
    }
    answer.push(num + 1);
  }
  return answer;
};
