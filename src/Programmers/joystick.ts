import {} from 'module';

const solution = (name: string): number => {
  /**
   * 조이스틱
   * TODO: 미해결
   */
  const size = name.length;
  let left = 0;
  for (let index = 0; index < size; index++) {
    const char = name[index];
    left += Math.min(
      char.charCodeAt(0) - 'A'.charCodeAt(0),
      'Z'.charCodeAt(0) + 1 - char.charCodeAt(0)
    );
    let loc = index + 1;
    while (loc !== size && name[loc] === 'A') {
      loc += 1;
    }
    if (loc === size) {
      break;
    }
    left += 1;
  }
  let right = 0;
  for (let count = 0; count < size; count++) {
    let index = (size - count) % size;
    const char = name[index];
    right += Math.min(
      char.charCodeAt(0) - 'A'.charCodeAt(0),
      'Z'.charCodeAt(0) + 1 - char.charCodeAt(0)
    );
    let loc = (size + index - 1) % size;
    while (loc !== 0 && name[loc] === 'A') {
      loc -= 1;
    }
    if (loc === 0) {
      break;
    }
    right += 1;
  }
  return Math.min(left, right);
};

console.log(solution('AZAAAZ'));
