const longestPalindrome = function (s: string): string {
  const size = s.length;
  for (let len = size; len > 0; len--) {
    for (let start = 0; start < size - len + 1; start++) {
      const sliced = s.slice(start, start + len);
      let index = 0;
      for (; index <= Math.floor(len / 2); index++) {
        if (sliced[index] !== sliced[len - index - 1]) {
          break;
        }
      }
      if (index === Math.floor(len / 2) + 1) {
        return sliced;
      }
    }
  }
  return '';
};

const longestPalindrome2 = function (s: string): string {
  const size = s.length;
  const table = Array.from(Array(size), () =>
    new Array<boolean>(size).fill(false)
  );
  for (let index = 0; index < size; index++) {
    table[index][index] = true;
  }
  for (let index = 0; index < size - 1; index++) {
    if (s[index] === s[index + 1]) {
      table[index][index + 1] = true;
    }
  }
  for (let len = 3; len <= size; len++) {
    for (let start = 0; start < size - len + 1; start++) {
      if (
        table[start + 1][start + len - 2] &&
        s[start] === s[start + len - 1]
      ) {
        table[start][start + len - 1] = true;
      }
    }
  }
  for (let len = size; len > 0; len--) {
    for (let start = 0; start < size - len + 1; start++) {
      if (table[start][start + len - 1]) {
        return s.slice(start, start + len);
      }
    }
  }
  return '';
};

console.log(longestPalindrome2('babad'));
