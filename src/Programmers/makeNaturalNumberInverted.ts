import {} from 'module';

const solution = (n: number): number[] => {
  /**
   * 자연수 뒤집어 배열로 만들기
   * time complexity: O(k) (k는 n의 자리수)
   * space complexity: O(k)
   */
  const answers: number[] = [];
  while (n > 0) {
    answers.push(n % 10);
    n = Math.floor(n / 10);
  }
  return answers;
};
