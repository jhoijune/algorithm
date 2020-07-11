import {} from 'module';

const solution = (gems: string[]) => {
  /**
   * 보석 쇼핑
   */
  const size = gems.length;
  const set = new Set<string>(gems);
  const limit = set.size;
  if (limit === 1) {
    return [1, 1];
  }
  const range = [1, size];
  const map = new Map<string, number>();
  let count = 0;
  let start = 0;
  let end = 0;
  while (start < size && end < size) {
    if (count === limit) {
      const exCount = map.get(gems[start])!;
      if (exCount === 1) {
        count -= 1;
      }
      map.set(gems[start], exCount - 1);
      start++;
    } else {
      const exCount = map.get(gems[end]);
      if (typeof exCount === 'undefined' || exCount === 0) {
        map.set(gems[end], 1);
        count += 1;
      } else {
        map.set(gems[end], exCount + 1);
      }
      end++;
    }
    if (count === limit && end - start - 1 < range[1] - range[0]) {
      range[0] = start + 1;
      range[1] = end;
    }
  }
  return range;
};

console.log(solution(['ZZZ', 'YYY', 'NNNN', 'YYY', 'BBB']));
