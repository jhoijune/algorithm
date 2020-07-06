import {} from 'module';

const solution = (dirs: string): number => {
  const location: [number, number] = [0, 0];
  const moves: number[][] = [];
  for (const dir of dirs) {
    const move: number[] = [];
    if (dir === 'U' && location[1] < 5) {
      move.push(location[0]);
      move.push(location[1]);
      move.push(0);
      location[1] = location[1] + 1;
    } else if (dir === 'D' && location[1] > -5) {
      location[1] = location[1] - 1;
      move.push(location[0]);
      move.push(location[1]);
      move.push(0);
    } else if (dir === 'R' && location[0] < 5) {
      move.push(location[0]);
      move.push(location[1]);
      move.push(1);
      location[0] = location[0] + 1;
    } else if (dir === 'L' && location[0] > -5) {
      location[0] = location[0] - 1;
      move.push(location[0]);
      move.push(location[1]);
      move.push(1);
    }
    if (
      move.length === 3 &&
      !moves.some(
        ([num1, num2, num3]) =>
          num1 === move[0] && num2 === move[1] && num3 === move[2]
      )
    ) {
      moves.push(move);
    }
  }
  return moves.length;
};
