import {} from 'module';

const solution = (relation: string[][]): number => {
  /**
   * 후보키
   * TODO: 비트마스크 , 부분집합
   */
  const rowLen = relation.length;
  const colLen = relation[0].length;
  const set = new Set<string>();
  const superSet: number[] = [];
  for (let num = 0; num < 1 << colLen; num++) {
    let row = 0;
    while (row < rowLen) {
      let concat = '';
      for (let col = 0; col < colLen; col++) {
        if (num & (1 << col)) {
          concat += `${relation[row][col]} `;
        }
      }
      if (set.has(concat)) {
        break;
      }
      set.add(concat);
      row += 1;
    }
    if (row === rowLen && !isSubset(superSet, num)) {
      superSet.push(num);
    }
    set.clear();
  }
  return superSet.length;
};

const isSubset = (arr: number[], number: number): boolean => {
  for (const value of arr) {
    if ((number & value) === value) {
      return true;
    }
  }
  return false;
};
