import {} from 'module';

const solution = (people: number[], limit: number): number => {
  /**
   * 구명보트
   * time complexity: O(nlogn)
   * space complexity: O(n)
   */
  const size = people.length;
  people.sort((a, b) => a - b);
  const isRescued = new Array(size).fill(false);
  let count = 0;
  let rescued = 0;
  let left = 0;
  let right = size - 1;
  while (rescued !== size) {
    if (isRescued[left]) {
      left += 1;
    }
    isRescued[left] = true;
    rescued += 1;
    const diff = limit - people[left];
    while (left < right) {
      if (diff >= people[right]) {
        isRescued[right] = true;
        rescued += 1;
        right -= 1;
        break;
      }
      right -= 1;
    }
    left += 1;
    count += 1;
  }
  return count;
};
