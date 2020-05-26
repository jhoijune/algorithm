/*
Given an array of positive integers representing edges of triangles. Find the number of
triangles that can be formed from these elements representing sides of triangles. For a triangle sum of
two edges is always greater than third edge.
Input: [1, 2, 3, 4, 5]
Output: 3, Corresponds to (2, 3, 4) (2, 4, 5) (3, 4, 5)
*/

const numberOfTriangles = (arr: number[]): number => {
  const size = arr.length;
  if (size < 3) {
    throw Error('Array length must be greater than 2');
  }
  const sorted = [...arr].sort((a, b) => a - b);
  let triangleNumber = 0;
  for (let third = size - 1; third > 1; third--) {
    for (let second = third - 1; second > 0; second--) {
      for (let first = second - 1; first >= 0; first--) {
        if (sorted[first] + sorted[second] > sorted[third]) {
          triangleNumber += 1;
          console.log(`(${sorted[first]},${sorted[second]},${sorted[third]})`);
        } else {
          break;
        }
      }
    }
  }
  return triangleNumber;
};

(() => {
  const arr = [1, 2, 3, 4, 5];
  console.log(numberOfTriangles(arr));
})();
