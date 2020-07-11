import {} from 'module';

const solution = (k: number, room_number: number[]): number[] => {
  /**
   * 호텔 방 배정
   */
  const map = new Map<number, number>();
  const answer: number[] = [];

  const findMapping = (start: number) => {
    let num = start;
    while (map.has(num)) {
      num = map.get(num)!;
    }
    return num;
  };

  const setMapping = (start: number, value: number) => {
    let set = value + 1;
    while (map.has(set)) {
      set = map.get(set)!;
    }
    map.set(value, set);
    while (start !== value) {
      const temp = map.get(start)!;
      map.set(start, set);
      start = temp;
    }
  };

  for (const value of room_number) {
    const num = findMapping(value);
    setMapping(value, num);
    answer.push(num);
  }
  return answer;
};
