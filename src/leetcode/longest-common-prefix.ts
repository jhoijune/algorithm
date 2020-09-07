const longestCommonPrefix = function (strs: string[]): string {
  const size = strs.length;
  if (size === 0) {
    return '';
  }
  const limit = strs.reduce(
    (prev, curr) => Math.min(prev, curr.length),
    Infinity
  );
  let end = 0;
  while (end < limit) {
    let index = 1;
    const comp = strs[0][end];
    while (index < size) {
      if (strs[index][end] === comp) {
        index += 1;
      } else {
        break;
      }
    }
    if (index === size) {
      end += 1;
    } else {
      break;
    }
  }
  return strs[0].slice(0, end);
};
