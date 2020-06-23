import {} from 'module';

const solution = (strings: string[], n: number) => {
  /**
   * 문자열 내 마음대로 정렬하기
   * time complexity: O(nlogn)
   */
  strings.sort((a, b) => {
    if (a[n] < b[n]) {
      return -1;
    } else if (a[n] > b[n]) {
      return 1;
    }
    return a.localeCompare(b);
  });
  return strings;
};
