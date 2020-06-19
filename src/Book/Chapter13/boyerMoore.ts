const boyerMoore = (text: string, pattern: string): number => {
  const textLen = text.length;
  const patternLen = pattern.length;
  const last = new Map<string, number>();
  for (let index = 0; index < patternLen; index++) {
    last.set(pattern[index], index);
  }
  let end = patternLen - 1;
  while (end < textLen) {
    let patternIndex = patternLen - 1;
    if (text[end] === pattern[patternIndex]) {
      if (patternIndex === 0) {
        return end;
      } else {
        end -= 1;
        patternIndex -= 1;
      }
    } else {
      const foo = last.get(text[end]);
      end += patternLen - Math.min(patternIndex, (foo || -1) + 1);
    }
  }
  return -1;
};
