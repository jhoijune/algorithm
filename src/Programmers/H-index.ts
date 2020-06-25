import {} from 'module';

const solution = (citations: number[]) => {
  /**
   * H-Index
   * time complexity: O(nlogn)
   */
  const size = citations.length;
  citations.sort((a, b) => b - a);
  let max = 0;
  for (let h = 1; h <= size; h++) {
    if (citations[h - 1] >= h && (h === size || citations[h] <= h)) {
      max = h;
    }
  }
  return max;
};
