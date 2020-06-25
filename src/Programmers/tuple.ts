import {} from 'module';

const solution = (s: string) => {
  /**
   * 튜플
   * time complexity: O(n!) (n은 집합의 개수)
   * space complexity: O(n)
   */
  const size = s.match(/{+.*?}+/g)!.length;
  const map = new Map<number, number>();
  const re = /\d{1,}/g;
  const numbers = s.match(re)!;
  for (const number of numbers) {
    const curr = Number(number);
    const exCount = map.get(curr);
    if (typeof exCount === 'undefined') {
      map.set(curr, 1);
    } else {
      map.set(curr, exCount + 1);
    }
  }
  const answer = new Array<number>(size);
  for (const number of map.keys()) {
    const count = map.get(number)!;
    answer[size - count] = number;
  }
  return answer;
};
