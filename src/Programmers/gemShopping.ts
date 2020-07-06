import {} from 'module';

const solution = (gems: string[]) => {
  /**
   * 보석 쇼핑
   * TODO: 슬라이딩 윈도우
   */
  const size = gems.length;
  const set = new Set<string>(gems);
  const limit = set.size;
  if (limit === 1) {
    return [1, 1];
  }
  const range = [1, size + 1];
  const map = new Map<string, number>();
  let start = 0;
  let end = 0;
  let count = 0;
  while (end < size) {
    while (end < size) {
      const exCount = map.get(gems[end]);
      if (typeof exCount === 'undefined' || exCount === 0) {
        map.set(gems[end], 1);
        count += 1;
      } else {
        map.set(gems[end], exCount + 1);
      }
      if (count === limit) {
        break;
      }
      end += 1;
    }
    while (count === limit && start !== end) {
      if (range[1] - range[0] > end - start) {
        range[0] = start + 1;
        range[1] = end + 1;
      }
      const exCount = map.get(gems[start])!;
      map.set(gems[start], exCount - 1);
      start += 1;
      if (exCount === 1) {
        count -= 1;
        break;
      }
    }
  }
  return range;
};

console.log(solution(['AA', 'AB', 'AC', 'AA', 'AC']));
