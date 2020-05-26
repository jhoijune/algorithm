// Given an array of integers, you need to find a triplet whose sum equal to given value.

const findTriplet1 = (arr: number[], value: number) => {
  const size = arr.length;
  if (size < 3) {
    throw Error('Array length must be greater than 2');
  }
  const sorted = [...arr];
  for (let first = 0; first < size - 2; first++) {
    let second = first + 1;
    let third = size - 1;
    while (second < third) {
      const currentSum = sorted[first] + sorted[second] + sorted[third];
      if (currentSum === value) {
        console.log(`(${sorted[first]},${sorted[second]},${sorted[third]})`);
        return true;
      } else if (currentSum < value) {
        second += 1;
      } else {
        third -= 1;
      }
    }
  }
  return false;
};
