const computeFailure = (str: string): number[] => {
  const size = str.length;
  const fail = new Array<number>(size).fill(0);
  let i = 0;
  let j = 1;
  while (j <= size) {
    if (str[i] === str[j]) {
      fail[j] = i + 1;
      i += 1;
      j += 1;
    } else if (i > 0) {
      i = fail[i - 1];
    } else {
      j += 1;
    }
  }
  return fail;
};

const KMP = (text: string, pattern: string): number => {
  const textLen = text.length;
  const patternLen = pattern.length;
  const fail = computeFailure(pattern);
  let textIndex = 0;
  let patternIndex = 0;
  while (textIndex < textLen) {
    if (text[textIndex] === pattern[patternIndex]) {
      if (patternIndex === patternLen - 1) {
        return textIndex - patternLen + 1;
      }
      textIndex += 1;
      patternIndex += 1;
    } else if (patternIndex > 0) {
      patternIndex = fail[patternIndex - 1];
    } else {
      textIndex += 1;
    }
  }
  return -1;
};
