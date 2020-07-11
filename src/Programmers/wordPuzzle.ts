import {} from 'module';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const solution = (strs: string[], t: string) => {
  const size = t.length;
  const table: number[] = [];
  for (let index = 0; index < size; index++) {
    const target = t.slice(0, index + 1);
    if (strs.includes(target)) {
      table[index] = 1;
      continue;
    }
    let min = size + 1;
    for (let idx = 0; idx < index; idx++) {
      const sliced = t.slice(0, idx + 1);
      for (const str of strs) {
        if (sliced + str === target) {
          min = Math.min(min, table[idx] + 1);
        }
      }
    }
    table[index] = min;
  }
  return table[size - 1] > size ? -1 : table[size - 1];
};
