import {} from 'module';

const solution = (arrangement: string): number => {
  const size = arrangement.length;
  let answer = 0;
  let count = 0;
  let loc = 0;
  while (loc < size) {
    /**
     * 쇠막대기
     * time complexity: O(n)
     */
    if (arrangement[loc] === '(') {
      loc += 1;
      if (arrangement[loc] === ')') {
        answer += count;
        loc += 1;
      } else {
        count += 1;
        answer += 1;
      }
    } else {
      count -= 1;
      loc += 1;
    }
  }
  return answer;
};

console.log(solution('()(((()())(())()))(())'));
