const longestValidParentheses = function (s: string): number {
  const size = s.length;
  let answer = 0;
  for (let start = 0; start < size; start++) {
    let count = 0;
    let parCount = 0;
    for (let index = start; index < size; index++) {
      if (s[index] === '(') {
        parCount += 1;
        count += 1;
      } else if (s[index] === ')' && parCount === 1) {
        parCount -= 1;
        count += 1;
        answer = Math.max(answer, count);
      } else if (s[index] === ')' && parCount === 0) {
        break;
      } else {
        parCount -= 1;
        count += 1;
      }
    }
  }
  return answer;
};
