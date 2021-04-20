const intToRoman = function (num: number): string {
  const answer: string[] = [];
  const romanMapping: [string, number][] = [
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
  ];
  let curr = 0;
  while (num > 0) {
    if (num >= romanMapping[curr][1]) {
      num -= romanMapping[curr][1];
      answer.push(romanMapping[curr][0]);
    } else {
      curr += 1;
    }
  }
  return answer.join('');
};
