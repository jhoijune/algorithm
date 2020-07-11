import {} from 'module';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const solution = (food_times: number[], k: number) => {
  /**
   * 무지의 먹방 라이브
   */
  const size = food_times.length;
  const sorted = [...food_times].sort((a, b) => a - b);
  let currK = k;
  let index = 0;
  for (; index < size; index++) {
    let diff: number;
    if (index === 0) {
      diff = sorted[index] * (size - index);
    } else {
      diff = (sorted[index] - sorted[index - 1]) * (size - index);
    }
    if (diff > currK) {
      break;
    }
    currK = currK - diff;
  }
  if (index === size) {
    return -1;
  }
  let idx = 0;
  currK = currK % (size - index);
  while (currK >= 0) {
    idx = idx % size;
    if (food_times[idx] >= sorted[index]) {
      currK -= 1;
    }
    idx = idx + 1;
  }
  return idx;
};

solution([3, 1, 2], 5);
