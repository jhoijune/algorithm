import {} from 'module';

const solution = (s: string): boolean => {
  /**
   * 문자열 다루기 기본
   * time complexity: O(n);
   */
  const regex = /^\d{4}$|^\d{6}$/;
  return regex.test(s);
};
