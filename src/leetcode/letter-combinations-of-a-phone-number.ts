const letterCombinations = function (digits: string): string[] {
  const size = digits.length;
  if (size === 0) {
    return [];
  }
  const answer: string[] = [];

  const DFS = function (curr: string[], index: number) {
    if (index === size) {
      answer.push(curr.join(''));
      return;
    }
    const digit = Number(digits[index]);
    const start = 'a'.charCodeAt(0) + (digit - 2) * 3 + (digit > 7 ? 1 : 0);
    const limit = digit === 9 || digit === 7 ? 4 : 3;
    for (let inc = 0; inc < limit; inc++) {
      curr.push(String.fromCharCode(start + inc));
      DFS(curr, index + 1);
      curr.pop();
    }
  };

  DFS([], 0);
  return answer;
};
