/*
Given an array of integers, you need to find largest subsequence in increasing order. You need to find
largest increasing sequence by selecting the elements from the given array such that their relative order
does not change.
*/

const lis = (arr: number[]): number[] => {
  const size = arr.length;
  const length = new Array<number>(size).fill(1);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && length[i] < length[j] + 1) {
        length[i] = length[j] + 1;
      }
    }
  }
  return length;
};
