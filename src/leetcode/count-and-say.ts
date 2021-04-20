const countAndSay = function (n: number) {
  const re = /(.)\1*/g;
  let string = '1';
  for (let curr = 2; curr <= n; curr++) {
    const tokens = string.match(re)!;
    const accu: string[] = [];
    for (const token of tokens) {
      accu.push(token.length.toString());
      accu.push(token[0]);
    }
    string = accu.join('');
  }
  return string;
};
countAndSay(4);
