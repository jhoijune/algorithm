const isValid = function (s: string): boolean {
  const stk: string[] = [];
  for (const char of s) {
    switch (char) {
      case '(':
      case '{':
      case '[': {
        stk.push(char);
        break;
      }
      case ')': {
        if (stk.length !== 0 && stk[stk.length - 1] === '(') {
          stk.pop();
          break;
        } else {
          return false;
        }
      }
      case '}': {
        if (stk.length !== 0 && stk[stk.length - 1] === '{') {
          stk.pop();
          break;
        } else {
          return false;
        }
      }
      case ']': {
        if (stk.length !== 0 && stk[stk.length - 1] === '[') {
          stk.pop();
          break;
        } else {
          return false;
        }
      }
    }
  }
  if (stk.length !== 0) {
    return false;
  }
  return true;
};
