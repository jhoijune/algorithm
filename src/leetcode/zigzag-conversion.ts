const convert = function (s: string, numRows: number): string {
  const size = s.length;
  const strings = Array.from(Array(numRows), () => new Array<string>());
  const point = numRows + Math.max(numRows - 2, 0);
  for (let index = 0; index < size; index++) {
    const mod = index % point;
    if (mod < numRows) {
      strings[mod].push(s[index]);
    } else {
      const back = mod % numRows;
      strings[numRows - back - 2].push(s[index]);
    }
  }
  const answer = strings.reduce((prev, curr) => prev + curr.join(''), '');
  return answer;
};

console.log(convert('PAYPALISHIRING', 3));
