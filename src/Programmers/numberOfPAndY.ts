import {} from 'module';

const solution = (s: string): boolean => {
  /**
   * 문자열 내 p와 y의 개수
   * time complexity: O(n)
   */
  let diff = 0;
  for (const char of s) {
    if (char.toLowerCase() === 'p') {
      diff += 1;
    } else if (char.toLowerCase() === 'y') {
      diff -= 1;
    }
  }
  return !diff;
};
