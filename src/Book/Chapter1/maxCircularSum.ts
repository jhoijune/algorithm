import '';

const maxCircularSum = (arr: number[]) => {
  const size = arr.length;
  let sumAll = 0;
  let currVal = 0;
  let maxVal = 0;
  for (let index = 0; index < size; index++) {
    sumAll += arr[index];
    currVal += index * arr[index];
  }
  maxVal = currVal;
  for (let index = 1; index < size; index++) {
    currVal = currVal + sumAll - size * arr[size - index];
    if (currVal > maxVal) {
      maxVal = currVal;
    }
  }
  return maxVal;
};

const test = () => {
  const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  console.log(`Max Circular Sum: ${maxCircularSum(arr)}`);
};
