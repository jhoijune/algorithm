import {} from 'module';

const solution = (s: string): string => {
  /**
   * 가운데 글자 가져오기
   * time complexity: O(1)
   * space complexity: O(1)
   */
  const size = s.length;
  if (size % 2 === 0) {
    return s.slice(Math.floor(size / 2) - 1, Math.floor(size / 2) + 1);
  }
  return s[Math.floor(size / 2)];
};
