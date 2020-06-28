import {} from 'module';

const solution = (cacheSize: number, cities: string[]): number => {
  const size = cities.length;
  let answer = 0;
  const cache: string[] = [];
  for (let index = 0; index < size; index++) {
    const loc = cache.findIndex(
      (value) => value.toLocaleLowerCase() === cities[index].toLowerCase()
    );
    if (loc !== -1) {
      const [value] = cache.splice(loc, 1);
      cache.push(value);
      answer += 1;
    } else {
      answer += 5;
      cache.push(cities[index]);
      if (cache.length > cacheSize) {
        cache.splice(0, 1);
      }
    }
  }
  return answer;
};
