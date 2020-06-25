import {} from 'module';

const solution = (clothes: [string, string][]): number => {
  /**
   * 위장
   * time complexity: O(n)
   * space complexity: O(1)
   */
  const map = new Map<string, number>();
  for (const [, species] of clothes) {
    const exCount = map.get(species);
    if (typeof exCount === 'undefined') {
      map.set(species, 1);
    } else {
      map.set(species, exCount + 1);
    }
  }
  let result = 1;
  for (const species of map.keys()) {
    result *= map.get(species)! + 1;
  }
  return result - 1;
};
