// Function to print next larger element of each element of circular array

const nextLargeElementCircular = (arr: number[]): number[] => {
  const size = arr.length;
  const stack: number[] = [];
  const output = new Array<number>(size);
  for (let index = 0; index < size; index++) {
    const curr = arr[index];
    while (stack.length > 0 && arr[stack[stack.length - 1]] < curr) {
      const insert = stack.pop()!;
      output[insert] = curr;
    }
    stack.push(index);
  }
  for (let index = 0; index < size - 1; index++) {
    const curr = arr[index];
    while (stack.length > 0 && arr[stack[stack.length - 1]] < curr) {
      const insert = stack.pop()!;
      output[insert] = curr;
    }
    if (stack.length === 0) {
      break;
    }
  }
  while (stack.length !== 0) {
    const insert = stack.pop()!;
    output[insert] = -1;
  }
  return output;
};

(() => {
  const arr = [6, 3, 9, 8, 10, 2, 1, 15, 7];
  console.log(nextLargeElementCircular(arr));
})();
