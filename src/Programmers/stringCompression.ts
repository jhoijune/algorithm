import {} from 'module';

const solution = (s: string) => {
  const size = s.length;
  const maxLen = Math.floor(size / 2);
  let min = size;
  for (let len = 1; len <= maxLen; len++) {
    let length = 0;
    let exPattern = s.slice(0, len);
    let loc = len;
    let count = 1;
    while (loc < size) {
      const curr = s.slice(loc, loc + len);
      if (exPattern === curr) {
        count += 1;
      } else {
        exPattern = curr;
        length += (count === 1 ? 0 : String(count).length) + len;
        count = 1;
      }
      loc += len;
    }
    length += (count === 1 ? 0 : String(count).length) + exPattern.length;
    if (length < min) {
      min = length;
    }
  }
  return min;
};

console.log(solution('abrabcabcadqabcabc'));
