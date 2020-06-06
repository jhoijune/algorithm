/*
In given histogram of rectangle bars of each one unit wide. Find the maximum area rectangle
in the histogram.
*/

const getMaxArea = (arr: number[]): number => {
  const size = arr.length;
  const stack: number[] = [];
  let maxArea = 0;
  let index = 0;
  while (index < size) {
    while (
      index < size &&
      (stack.length === 0 || arr[stack[stack.length - 1]] <= arr[index])
    ) {
      stack.push(index);
      index++;
    }
    while (
      stack.length !== 0 &&
      (index === size || arr[stack[stack.length - 1]] > arr[index])
    ) {
      const top = stack[stack.length - 1];
      stack.pop();
      const topArea =
        arr[top] *
        (stack.length === 0 ? index : index - stack[stack.length - 1] - 1);
      if (maxArea < topArea) {
        maxArea = topArea;
      }
    }
  }
  return maxArea;
};
