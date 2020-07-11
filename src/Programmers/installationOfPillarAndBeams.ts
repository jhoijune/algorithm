import {} from 'module';

const solution = (
  n: number,
  build_frame: [number, number, number, number][]
): [number, number, number][] => {
  /**
   * 기둥과 보 설치
   * time compleixty: O(n^2 * m)
   * space complexity:  O(n^2)
   */
  const FLAG_PILLAR = 1;
  const FLAG_BEAM = 2;
  const board = Array.from(Array(n + 1), () =>
    new Array<number>(n + 1).fill(0)
  );

  const isPillarExist = (x: number, y: number): number => {
    return board[x][y] & FLAG_PILLAR;
  };

  const isBeamExist = (x: number, y: number): number => {
    return board[x][y] & FLAG_BEAM;
  };

  const isPillarPossible = (x: number, y: number): boolean => {
    if (y === 0) {
      return true;
    } else if (isPillarExist(x, y - 1)) {
      // 기둥 위에 있거나
      return true;
    } else if (isBeamExist(x, y)) {
      // 보의 왼쪽 끝 부분
      return true;
    } else if (x > 0 && isBeamExist(x - 1, y)) {
      // 보의 오른쪽 끝 부분
      return true;
    }
    return false;
  };

  const isBeamPossible = (x: number, y: number): boolean => {
    if (isPillarExist(x, y - 1)) {
      // 왼쪽 끝 부분이 기둥 위에 있다
      return true;
    } else if (x < n && isPillarExist(x + 1, y - 1)) {
      // 오른쪽 끝 부분이 기둥 위에 있다.
      return true;
    } else if (
      x > 0 &&
      x < n &&
      isBeamExist(x - 1, y) &&
      isBeamExist(x + 1, y)
    ) {
      //양쪽 끝 부분이 다른 보와 동시에 연결되어 있다.
      return true;
    }
    return false;
  };

  const checkBoard = (): boolean => {
    for (let x = 0; x <= n; x++) {
      for (let y = 0; y <= n; y++) {
        if (isPillarExist(x, y) && !isPillarPossible(x, y)) {
          return false;
        }
        if (isBeamExist(x, y) && !isBeamPossible(x, y)) {
          return false;
        }
      }
    }
    return true;
  };

  for (const [x, y, type, isInstall] of build_frame) {
    if (isInstall) {
      if (type === 0 && isPillarPossible(x, y)) {
        board[x][y] ^= FLAG_PILLAR;
      } else if (type === 1 && isBeamPossible(x, y)) {
        board[x][y] ^= FLAG_BEAM;
      }
    } else {
      if (type === 0) {
        board[x][y] ^= FLAG_PILLAR;
        if (!checkBoard()) {
          board[x][y] ^= FLAG_PILLAR;
        }
      } else {
        board[x][y] ^= FLAG_BEAM;
        if (!checkBoard()) {
          board[x][y] ^= FLAG_BEAM;
        }
      }
    }
  }

  const answer: [number, number, number][] = [];
  for (let x = 0; x <= n; x++) {
    for (let y = 0; y <= n; y++) {
      if (isPillarExist(x, y)) {
        answer.push([x, y, 0]);
      }
      if (isBeamExist(x, y)) {
        answer.push([x, y, 1]);
      }
    }
  }
  return answer;
};
