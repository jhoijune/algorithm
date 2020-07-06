import {} from 'module';

const solution = (triangle: number[][]): number => {
  /**
   * 정수 삼각형
   * time complexity: O(n^2)
   * space complexity: O(n^2)
   */
  const height = triangle.length;
  const maxTriangle: number[][] = [];
  maxTriangle.push(triangle[0]);
  for (let curr = 1; curr < height; curr++) {
    const container: number[] = [];
    for (let left = 0; left <= curr; left++) {
      let value: number;
      if (left === 0) {
        value = maxTriangle[curr - 1][0] + triangle[curr][0];
      } else if (left === curr) {
        value = maxTriangle[curr - 1][curr - 1] + triangle[curr][curr];
      } else {
        value =
          Math.max(
            maxTriangle[curr - 1][left - 1],
            maxTriangle[curr - 1][left]
          ) + triangle[curr][left];
      }
      container.push(value);
    }
    maxTriangle.push(container);
  }
  return Math.max(...maxTriangle[height - 1]);
};
