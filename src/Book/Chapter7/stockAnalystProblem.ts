/*
A stock analyst had approached you to write a program to find stock hike points in some
stocks. A stock hike point is the values of stock that is greater than all its previous values. You are
provided stock price in an infinite stream with most recent value first (in term of time the data is provided
in reverse order.).
For Example , in stock values are [20, 19, 10, 21, 40, 35, 39, 50, 45, 42], stock hike points values are 20,
21, 40 and 50 but the data is provided in reverse order.
*/

const stockAnalysProblem = (arr: number[]): number[] => {
  const stack: number[] = [];
  for (const value of arr) {
    if (stack.length === 0 || stack[stack.length - 1] > value) {
      stack.push(value);
    } else {
      while (stack.length !== 0 && stack[stack.length - 1] < value) {
        stack.pop();
      }
      stack.push(value);
    }
  }
  stack.reverse();
  return stack;
};

(() => {
  const arr = [20, 19, 10, 21, 40, 35, 39, 50, 45, 42];
  arr.reverse();
  console.log(stockAnalysProblem(arr));
})();
