import {} from 'module';

const solution = (nums: number[]) => {
  /**
   * 폰켓몬
   * time complexity: O(n)
   * space complexity: O(n)
   */
  const half = Math.floor(nums.length / 2);
  const set = new Set<number>();
  for (const num of nums) {
    set.add(num);
  }
  return half > set.size ? set.size : half;
};
