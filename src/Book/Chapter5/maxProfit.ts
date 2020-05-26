/*
In given list, in which nth element is the price of the stock on nth day. You are asked to buy
once and sell once, on what date you will be buying and at what date you will be selling to get maximum
profit.
*/

const maxProfit1 = (arr: number[]) => {
  const size = arr.length;
  let buy = 0;
  let sell = 0;
  let minIndex = 0;
  let maxProfit = 0;
  for (let index = 1; index < size; index++) {
    const currProfit = arr[index] - arr[minIndex];
    if (currProfit < 0) {
      minIndex = index;
    } else {
      if (currProfit > maxProfit) {
        buy = minIndex;
        sell = index;
        maxProfit = currProfit;
      }
    }
  }
  console.log(`Purchase day is- ${buy} at price ${arr[buy]}`);
  console.log(`Sell day is- ${sell} at price ${arr[sell]}`);
};
