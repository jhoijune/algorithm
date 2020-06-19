const bruteForceSearch = (text: string, pattern: string): number => {
  let start = 0;
  const textLen = text.length;
  const patterLen = pattern.length;
  while (start <= textLen - patterLen) {
    let patternIndex = 0;
    while (
      patternIndex < patterLen &&
      pattern[patternIndex] === text[start + patternIndex]
    ) {
      patternIndex += 1;
    }
    if (patternIndex === patterLen) {
      return start;
    }
    start += 1;
  }
  return -1;
};
