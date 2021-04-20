const romanToInt = function (s: string): number {
  const size = s.length;
  let answer = 0;
  const romanMapping = new Map([
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ]);
  let curr = 0;
  while (curr < size) {
    if (curr < size - 1 && romanMapping.has(s.slice(curr, curr + 2))) {
      answer += romanMapping.get(s.slice(curr, curr + 2))!;
      curr += 2;
    } else {
      answer += romanMapping.get(s[curr])!;
      curr += 1;
    }
  }
  return answer;
};

const romanToInt2 = function (s: string): number {
  // regex 사용
  const re = /CM|CD|XC|XL|IX|IV|M|D|C|L|X|V|I/g;
  const tokens = s.match(re)!;
  const romanMapping = new Map([
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ]);
  let answer = 0;
  for (const token of tokens) {
    answer += romanMapping.get(token)!;
  }
  return answer;
};
