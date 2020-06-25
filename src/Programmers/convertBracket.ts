import {} from 'module';

const reverse = (s: string) => {
  let result = '';
  for (const char of s) {
    result += char === '(' ? ')' : '(';
  }
  return result;
};

const solution = (p: string): string => {
  const size = p.length;
  if (size === 0) {
    return '';
  }
  let isCorrect = p[0] === '(' ? true : false;
  let length = 1;
  let index = 1;
  while (length !== 0) {
    if (p[index] === '(') {
      length = length + (isCorrect ? 1 : -1);
    } else {
      length = length + (isCorrect ? -1 : 1);
    }
    index += 1;
  }
  const right = solution(p.slice(index));
  if (!isCorrect) {
    let answer = `(${right})`;
    const modified = reverse(p.slice(0, index - 1));
    return answer + modified;
  }
  const left = p.slice(0, index);
  return left + right;
};

console.log(solution('(()())()'));
