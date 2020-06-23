import {} from 'module';

const solution = (skill: string, skill_trees: string[]): number => {
  /**
   * 스킬 트리
   * time complexity: O(n*m) // n은 배열의 크기 m은 글자의 최대 길이
   */
  const re = new RegExp(`[^${skill}]`, 'g');
  let able = 0;
  for (const tree of skill_trees) {
    const modified = tree.replace(re, '');
    let index = 0;
    while (index < modified.length && modified[index] === skill[index]) {
      index += 1;
    }
    if (index === modified.length) {
      able += 1;
    }
  }
  return able;
};

console.log(solution('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']));
