const combinationUtil = (
  start: number,
  end: number,
  k: number,
  entity: number[],
  result: number[][]
) => {
  if (k === 0) {
    result.push(entity);
    return;
  }
  for (let num = start; num <= end - k + 1; num++) {
    combinationUtil(num + 1, end, k - 1, [...entity, num], result);
  }
};

const combination = (start: number, end: number, k: number): number[][] => {
  if (!Number.isInteger(k) || k <= 0) {
    throw Error('invalid input');
  }
  const result: number[][] = [];
  for (let num = start; num <= end - k + 1; num++) {
    combinationUtil(num + 1, end, k - 1, [num], result);
  }
  return result;
};

export { combination };
