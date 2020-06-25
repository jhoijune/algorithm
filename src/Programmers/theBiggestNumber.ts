import {} from 'module';

const solution = (numbers: number[]): string => {
  /**
   * 가장 큰 수
   *  time complexity: O(knlognk) (k는 숫자의 최대자릿수의 합)
   */
  numbers.sort((a, b) => {
    const str1 = String(a);
    const str2 = String(b);
    const comb1 = str1 + str2;
    const comb2 = str2 + str1;
    const size = comb1.length;
    for (let index = 0; index < size; index++) {
      if (comb1[index] > comb2[index]) {
        return -1;
      } else if (comb1[index] < comb2[index]) {
        return 1;
      }
    }
    return 0;
  });
  if (numbers[0] === 0) {
    return '0';
  }
  return numbers.join('');
};
