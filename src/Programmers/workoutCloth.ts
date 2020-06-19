import {} from 'module';

const solution = (n: number, lost: number[], reserve: number[]): number => {
  /**
   * 체육복
   * time complexity: O(n^2)
   * space complexity: O(n)
   */
  lost.sort((a, b) => a - b);
  reserve.sort((a, b) => a - b);
  const modifiedLost = lost.filter((value) => !reserve.includes(value));
  const modifiedReserve = reserve.filter((value) => !lost.includes(value));
  let result = 0;
  const lostSize = modifiedLost.length;
  const reserveSize = modifiedReserve.length;
  let lostInd = 0;
  let reserveInd = 0;
  for (let num = 1; num <= n; num++) {
    if (lostInd < lostSize && modifiedLost[lostInd] === num) {
      while (
        reserveInd < reserveSize &&
        num - modifiedReserve[reserveInd] > 1
      ) {
        reserveInd += 1;
      }
      if (
        reserveInd < reserveSize &&
        Math.abs(num - modifiedReserve[reserveInd]) <= 1
      ) {
        result += 1;
        reserveInd += 1;
      }
      lostInd += 1;
    } else {
      result += 1;
    }
  }
  return result;
};
