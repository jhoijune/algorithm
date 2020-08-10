const maxArea = (height: number[]): number => {
  const size = height.length;
  let answer = 0;
  let left = 0;
  let right = size - 1;
  while (left < right) {
    const vertical = Math.min(height[left], height[right]);
    const area = vertical * (right - left);
    answer = Math.max(answer, area);
    if (height[left] < height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }
  return answer;
};
