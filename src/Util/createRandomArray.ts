import _ from 'lodash';

const createRandomArray = (size: number, max: number): number[] => {
  const arr: number[] = new Array(size);
  for (let index = 0; index < size; index++) {
    arr[index] = _.random(max);
  }
  return arr;
};

export default createRandomArray;
export { createRandomArray };
