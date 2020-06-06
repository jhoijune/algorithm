//Function to print next larger element of each element of array

const nextLargetElement = (arr: number[]): number[] => {
  const size = arr.length;
  const stack: number[] = [];
  const output = new Array<number>(size);
  for (let index = 0; index < size; index++) {
    const curr = arr[index];
    while (stack.length > 0 && arr[stack[stack.length - 1]] <= curr) {
      const insert = stack.pop()!;
      output[insert] = curr;
    }
    stack.push(index);
  }
  while (stack.length !== 0) {
    const insert = stack.pop()!;
    output[insert] = -1;
  }
  return output;
};
