import {} from 'module';

const solution = (genres: string[], plays: number[]): number[] => {
  const combined = genres.map((genre, index) => {
    return {
      genre,
      index,
      play: plays[index],
    };
  });
  combined.sort((a, b) => {
    if (a.play !== b.play) {
      return b.play - a.play;
    }
    return a.index - b.index;
  });
  const map = new Map<string, number>();
  for (const { genre, play } of combined) {
    const exPlay = map.get(genre);
    if (typeof exPlay === 'undefined') {
      map.set(genre, play);
    } else {
      map.set(genre, play + exPlay);
    }
  }
  const aux: { genre: string; play: number }[] = [];
  for (const genre of map.keys()) {
    const play = map.get(genre)!;
    aux.push({ genre, play });
  }
  aux.sort((a, b) => b.play - a.play);
  const answer: number[] = [];
  for (const { genre: genre1 } of aux) {
    let count = 0;
    for (const { genre: genre2, index } of combined) {
      if (count < 2 && genre1 === genre2) {
        answer.push(index);
        count += 1;
      }
    }
  }
  return answer;
};
