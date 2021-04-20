const trap = function (height: number[]): number {
  const size = height.length;
  if (size === 0) {
    return 0;
  }
  const leftMax = new Array<number>(size).fill(0);
  const rightMax = new Array<number>(size).fill(0);
  leftMax[0] = height[0];
  let max = leftMax[0];
  for (let index = 1; index < size; index++) {
    if (height[index] > max) {
      max = height[index];
    }
    leftMax[index] = max;
  }
  rightMax[size - 1] = height[size - 1];
  max = rightMax[size - 1];
  for (let index = size - 2; index >= 0; index--) {
    if (height[index] > max) {
      max = height[index];
    }
    rightMax[index] = max;
  }
  let rain = 0;
  for (let index = 1; index < size - 1; index++) {
    rain += Math.min(leftMax[index], rightMax[index]) - height[index];
  }
  return rain;
};

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
