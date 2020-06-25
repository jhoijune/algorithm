import {} from 'module';

const solution = (number: string, k: number): string => {
  /**
   * 큰 수 만들기
   * time complexity: O(n)
   * space complexity: O(n)
   * TODO: 다시 보기
   */
  const numbers = number.split('');
  const size = numbers.length;
  const answer: number[] = [];
  let max = size - k;
  for (let index = 0; index < size; index++) {
    const value = Number(numbers[index]);
    while (
      size - index > max - answer.length &&
      answer.length !== 0 &&
      value > answer[answer.length - 1]
    ) {
      answer.pop();
    }
    answer.push(value);
  }
  return answer.slice(0, max).join('');
};
