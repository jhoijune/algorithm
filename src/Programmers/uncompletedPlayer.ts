import {} from 'module';

const solution = (
  participant: string[],
  completion: string[]
): string | null => {
  /**
   * 완주하지 못한 선수
   * time complexity : O(n)
   * space complexity: O(n)
   */
  const map = new Map<string, number>();
  for (const name of completion) {
    if (map.has(name)) {
      const exCount = map.get(name)!;
      map.set(name, exCount + 1);
    } else {
      map.set(name, 1);
    }
  }
  for (const name of participant) {
    const count = map.get(name);
    if (typeof count === 'undefined' || count === 0) {
      return name;
    } else {
      map.set(name, count - 1);
    }
  }
  return null;
};
