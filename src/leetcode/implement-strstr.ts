const computeFail = function (P: string): number[] {
  const size = P.length;
  const fail = Array<number>(size).fill(0);
  let j = 1;
  let k = 0;
  while (j < size) {
    if (P[j] === P[k]) {
      fail[j] = k + 1;
      j += 1;
      k += 1;
    } else if (k > 0) {
      k = fail[k - 1];
    } else {
      j += 1;
    }
  }
  return fail;
};

const strStr = function (haystack: string, needle: string): number {
  const stackSize = haystack.length;
  const needleSize = needle.length;
  if (needleSize === 0) {
    return 0;
  }
  const fail = computeFail(needle);
  let j = 0;
  let k = 0;
  while (j < stackSize) {
    if (haystack[j] === needle[k]) {
      if (k === needleSize - 1) {
        return j - needleSize + 1;
      }
      j += 1;
      k += 1;
    } else if (k > 0) {
      k = fail[k - 1];
    } else {
      j += 1;
    }
  }
  return -1;
};
