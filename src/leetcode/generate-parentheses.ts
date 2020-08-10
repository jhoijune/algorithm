const generateParenthesis = function (n: number): string[] {
  if (n === 0) {
    return [];
  }
  const limit = n * 2;
  const answer: string[] = [];

  const DFS = function (curr: string[], left: number, right: number) {
    if (curr.length === limit) {
      answer.push(curr.join(''));

      return;
    }
    if (left < n) {
      curr.push('(');
      DFS(curr, left + 1, right);
      curr.pop();
    }
    if (right < left) {
      curr.push(')');
      DFS(curr, left, right + 1);
      curr.pop();
    }
  };
  DFS([], 0, 0);
  return answer;
};

console.log(generateParenthesis(3));
