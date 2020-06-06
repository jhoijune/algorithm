/*
In given list of daily stock price in an array A[i]. Find the span of the stocks for each day. A
span of stock is the maximum number of days for which the price of stock was lower than that day.
*/

const stockSpanRange = (arr: number[]): number[] => {
  const size = arr.length;
  const stack: number[] = [0];
  const result = [1];
  for (let index = 1; index < size; index++) {
    while (stack.length !== 0 && arr[stack[stack.length - 1]] <= arr[index]) {
      stack.pop();
    }
    if (stack.length === 0) {
      result.push(index + 1);
    } else {
      result.push(index - stack[stack.length - 1]);
    }
    stack.push(index);
  }
  return result;
};
