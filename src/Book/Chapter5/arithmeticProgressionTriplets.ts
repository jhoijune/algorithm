// Given a sorted array find all Arithmetic progression triplet possible.

import { createRandomArray } from '../../Util';

const arithmeticProgressionTriplets = (arr: number[]) => {
  const size = arr.length;
  if (size < 3) {
    throw Error('Array length must be greater than 2');
  }
  for (let second = 1; second < size - 1; second++) {
    let first = second - 1;
    let third = second + 1;
    while (first >= 0 && third < size) {
      if (arr[first] + arr[third] === 2 * arr[second]) {
        console.log(`Triplet : : ${arr[first]}${arr[second]}${arr[third]}`);
        first -= 1;
        third += 1;
      } else if (arr[first] + arr[third] > 2 * arr[second]) {
        first -= 1;
      } else {
        third += 1;
      }
    }
  }
};

() => {
  const arr = createRandomArray(20, 100);
  arr.sort((a, b) => a - b);
};
