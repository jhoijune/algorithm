import {} from 'module';

const solution = (s: string) => {
  /**
   * 문자열 내림차순으로 배치하기
   * time complexity: O(nlogn)
   */
  const chars = s.split('');
  chars.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));
  return chars.join('');
};
