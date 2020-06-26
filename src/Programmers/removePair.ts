import {} from 'module';

const solution = (s: string) => {
  /**
   * 짝지어 제거하기
   * time complexity: O(n)
   * space complexity: O(n)
   */
  let result: string[] = [];
  for (const char of s) {
    if (result.length !== 0 && result[result.length - 1] === char) {
      result.pop();
    } else {
      result.push(char);
    }
  }
  return result.length > 0 ? 0 : 1;
};
