import {} from 'module';

const solution = (s: string): string => {
  /**
   * 이상한 문자 만들기
   * time complexity: O(n)
   * space complexity: O(n)
   */
  const words = s.split(' ').map((string) => {
    let result = '';
    for (let index = 0; index < string.length; index++) {
      if (index % 2 === 0) {
        result += string[index].toUpperCase();
      } else {
        result += string[index].toLowerCase();
      }
    }
    return result;
  });
  return words.join(' ');
};
