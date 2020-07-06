import {} from 'module';

const solution = (s: string): number => {
  /**
   * 가장 긴 팰린드롬
   */
  const size = s.length;
  let answer = 1;
  for (let start = 0; start < size; start++) {
    for (let length = answer + 1; length <= size; length++) {
      if (start + length - 1 < size) {
        let count = 0;
        for (; count < Math.ceil(length / 2); count++) {
          if (s[start + count] !== s[start + length - 1 - count]) {
            break;
          }
        }
        if (count === Math.ceil(length / 2)) {
          answer = length;
        }
      } else {
        break;
      }
    }
  }
  return answer;
};
