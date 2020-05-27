import rotationMax from './rotationMax';

const countRotation = (arr: number[]) => {
  const size = arr.length;
  const maxIndex = rotationMax(arr);
  return size - 1 - maxIndex;
};
