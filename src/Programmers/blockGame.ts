import {} from 'module';

const solution = (board: number[][]): number => {
  const N = board.length;
  let answer = 0;

  const fillZero = (targets: number[]) => {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (targets.includes(board[row][col])) {
          board[row][col] = 0;
        }
      }
    }
  };

  const shape1 = (row: number, col: number, num: number): boolean => {
    if (row === N - 1 || col >= N - 2) {
      return false;
    }
    const comparison = [
      [num, 0, 0],
      [num, num, num],
    ];
    for (let rowInc = 0; rowInc < 2; rowInc++) {
      for (let colInc = 0; colInc < 3; colInc++) {
        if (comparison[rowInc][colInc] !== board[row + rowInc][col + colInc]) {
          return false;
        }
      }
    }
    for (let r = 0; r < row; r++) {
      for (let colInc = 1; colInc < 3; colInc++) {
        if (board[r][col + colInc] !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  const shape2 = (row: number, col: number, num: number): boolean => {
    if (row < 2 || col >= N - 1) {
      return false;
    }
    const comparison = [
      [0, num],
      [0, num],
      [num, num],
    ];
    for (let rowInc = 0; rowInc < 3; rowInc++) {
      for (let colInc = 0; colInc < 2; colInc++) {
        if (
          comparison[2 - rowInc][colInc] !== board[row - rowInc][col + colInc]
        ) {
          return false;
        }
      }
    }
    for (let r = 0; r < row - 2; r++) {
      if (board[r][col] !== 0) {
        return false;
      }
    }
    return true;
  };

  const shape3 = (row: number, col: number, num: number): boolean => {
    if (row >= N - 2 || col >= N - 1) {
      return false;
    }
    const comparison = [
      [num, 0],
      [num, 0],
      [num, num],
    ];
    for (let rowInc = 0; rowInc < 3; rowInc++) {
      for (let colInc = 0; colInc < 2; colInc++) {
        if (comparison[rowInc][colInc] !== board[row + rowInc][col + colInc]) {
          return false;
        }
      }
    }
    for (let r = 0; r < row; r++) {
      if (board[r][col + 1] !== 0) {
        return false;
      }
    }
    return true;
  };

  const shape4 = (row: number, col: number, num: number): boolean => {
    if (row < 1 || col >= N - 2) {
      return false;
    }
    const comparison = [
      [0, 0, num],
      [num, num, num],
    ];
    for (let rowInc = 0; rowInc < 2; rowInc++) {
      for (let colInc = 0; colInc < 3; colInc++) {
        if (
          comparison[1 - rowInc][colInc] !== board[row - rowInc][col + colInc]
        ) {
          return false;
        }
      }
    }
    for (let r = 0; r < row - 1; r++) {
      for (let colInc = 0; colInc < 2; colInc++) {
        if (board[r][col + colInc] !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  const shape5 = (row: number, col: number, num: number): boolean => {
    if (row < 1 || col >= N - 2) {
      return false;
    }
    const comparison = [
      [0, num, 0],
      [num, num, num],
    ];
    for (let rowInc = 0; rowInc < 2; rowInc++) {
      for (let colInc = 0; colInc < 3; colInc++) {
        if (
          comparison[1 - rowInc][colInc] !== board[row - rowInc][col + colInc]
        ) {
          return false;
        }
      }
    }
    for (let r = 0; r < row - 1; r++) {
      for (let colInc = 0; colInc < 3; colInc += 2) {
        if (board[r][col + colInc] !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  const isDeleteable = (row: number, col: number, num: number): boolean => {
    if (
      shape1(row, col, num) ||
      shape2(row, col, num) ||
      shape3(row, col, num) ||
      shape4(row, col, num) ||
      shape5(row, col, num)
    ) {
      return true;
    }
    return false;
  };

  while (true) {
    const deleteNumbers: number[] = [];
    const numberSet = new Set<number>();
    for (let col = 0; col < N; col++) {
      for (let row = 0; row < N; row++) {
        if (board[row][col] !== 0 && !numberSet.has(board[row][col])) {
          numberSet.add(board[row][col]);
          if (isDeleteable(row, col, board[row][col])) {
            deleteNumbers.push(board[row][col]);
          }
        }
      }
    }
    if (deleteNumbers.length !== 0) {
      fillZero(deleteNumbers);
      answer += deleteNumbers.length;
    } else {
      break;
    }
  }
  return answer;
};

console.log(
  solution([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 4, 0, 0, 0],
    [0, 0, 0, 2, 3, 0, 0, 0, 5, 5],
    [1, 2, 2, 2, 3, 3, 0, 0, 0, 5],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 5],
  ])
);
