import {} from 'module';

const solution = (m: number, n: number, board: string[]) => {
  /**
   * 프렌즈 4블록
   * space complexity: O(mn)
   */
  const table: (null | string)[][] = [];
  for (const value of board) {
    table.push(value.split(''));
  }
  while (true) {
    let isDeleted = false;
    let deleteEntity: [number, number][] = [];
    for (let col = 0; col < n - 1; col++) {
      let height = 0;
      for (let row = m - 1; row > 0; row--) {
        if (table[row][col] === null) {
          continue;
        }
        height += 1;
        let upperIndex = row - 1;
        while (upperIndex >= 0 && table[upperIndex][col] === null) {
          upperIndex -= 1;
        }
        if (upperIndex === -1 || table[row][col] !== table[upperIndex][col]) {
          continue;
        }
        const right = [];
        let rightIndex = m - 1;
        let currHeight = 0;
        while (rightIndex >= 0 && currHeight < height + 1) {
          if (table[rightIndex][col + 1] !== null) {
            currHeight += 1;
            if (currHeight === height || currHeight === height + 1) {
              right.push(rightIndex);
            }
          }
          rightIndex -= 1;
        }
        if (
          right.length !== 2 ||
          table[row][col] !== table[right[0]][col + 1] ||
          table[row][col] !== table[right[1]][col + 1]
        ) {
          continue;
        }
        deleteEntity.push(
          [row, col],
          [upperIndex, col],
          [right[0], col + 1],
          [right[1], col + 1]
        );
        isDeleted = true;
      }
    }
    if (!isDeleted) {
      break;
    }
    for (const [row, col] of deleteEntity) {
      table[row][col] = null;
    }
  }
  const answer = table.map((value) => value.filter((v) => v === null).length);
  return answer.reduce((prev, curr) => prev + curr, 0);
};

console.log(solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']));
