import {} from 'module';

const solution = (s: string) => {
  /**
   * JadenCase 문자열
   * time complexity: O(n)
   * spce complexity: O(n)
   */
  const size = s.length;
  let result = '';
  for (let index = 0; index < size; index++) {
    if (index === 0 || s[index - 1] === ' ') {
      result += s[index].toUpperCase();
    } else {
      result += s[index].toLowerCase();
    }
  }
  return result;
};
