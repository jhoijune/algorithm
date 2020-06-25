import {} from 'module';

const solution = (s: string): boolean => {
  /**
   * 올바른 괄호
   * time complexity: O(n)
   */
  let stack = 0;
  for (const char of s) {
    if (char === '(') {
      stack += 1;
    } else {
      if (stack === 0) {
        return false;
      }
      stack -= 1;
    }
  }
  if (stack !== 0) {
    return false;
  }
  return true;
};
