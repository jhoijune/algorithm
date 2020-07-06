const swap = <T>(arr: T[], i: number, j: number): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export default swap;
export { swap };
