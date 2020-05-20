const towerOfHanoi = (num: number, src: string, dst: string, temp: string) => {
  if (num < 1) {
    return;
  }
  towerOfHanoi(num - 1, src, temp, dst); // n-1개의 원판을 임시장소로 옮김
  console.log(`Move ${num} disk from peg ${src} to peg ${dst}`); // 1개의 원판을 목적지로 옮김
  towerOfHanoi(num - 1, temp, dst, src); // n-1개의 원판을 임시장소에서 목적지로 옮김
};

const test = () => {
  const num = 63;
  console.log('The sequence of moves are :');
  towerOfHanoi(num, 'A', 'C', 'B');
};

test();
