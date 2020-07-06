import {} from 'module';

const solution = (nodeinfo: [number, number][]) => {
  /**
   * 길찾기 게임
   */
  const size = nodeinfo.length;
  const combined = nodeinfo.map((value, index) => [...value, index + 1]);
  combined.sort((a, b) => {
    if (b[1] > a[1]) {
      return 1;
    } else if (b[1] < a[1]) {
      return -1;
    } else if (a[0] < b[0]) {
      return -1;
    } else {
      return 1;
    }
  });
  const starts = new Map<number, number>();
  for (let index = 0; index < size; index++) {
    const [, y] = combined[index];
    if (!starts.has(y)) {
      starts.set(y, index);
    }
  }
  const preOrders: number[] = [];
  const preorder = (start: number, end: number, index: number) => {
    let [x, y, number] = combined[index];
    preOrders.push(number);
    y -= 1;
    while (y >= 0) {
      let idx = starts.get(y);
      if (typeof idx === 'undefined') {
        y -= 1;
        continue;
      }
      while (idx < size && combined[idx][1] === y) {
        if (start <= combined[idx][0] && combined[idx][0] <= x) {
          preorder(start, x, idx);
        }
        if (x <= combined[idx][0] && combined[idx][0] <= end) {
          preorder(x, end, idx);
        }
        idx += 1;
      }
      break;
    }
  };
  preorder(0, 100000, 0);
  const postOrders: number[] = [];
  const postorder = (start: number, end: number, index: number) => {
    let [x, y, number] = combined[index];
    y -= 1;
    while (y >= 0) {
      let idx = starts.get(y);
      if (typeof idx === 'undefined') {
        y -= 1;
        continue;
      }
      while (idx < size && combined[idx][1] === y) {
        if (start <= combined[idx][0] && combined[idx][0] <= x) {
          postorder(start, x, idx);
        }
        if (x <= combined[idx][0] && combined[idx][0] <= end) {
          postorder(x, end, idx);
        }
        idx += 1;
      }
      break;
    }
    postOrders.push(number);
  };
  postorder(0, 100000, 0);
  return [preOrders, postOrders];
};
