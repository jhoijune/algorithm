import { readFileSync } from 'fs';
import { dir } from 'console';

const source = __dirname + '\\input.txt';
const dices = readFileSync(source)
  .toString()
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = function (dices: number[]) {
  const scores = [
    [...Array(20).keys()].map((v) => 2 * v + 2),
    [13, 16, 19],
    [22, 24],
    [28, 27, 26],
    [25, 30, 35],
  ];

  let answer = 0;

  const checkDuplicateLocation = function (
    comp: [number, number],
    locations: [number, number][]
  ) {
    for (const location of locations) {
      if (comp[0] === location[0] && comp[1] === location[1]) {
        return true;
      }
    }
    return false;
  };

  const commonTask = function (
    loc: [number, number],
    index: number,
    score: number,
    arrival: number,
    locations: [number, number][],
    queue: {
      score: number;
      arrival: number;
      locations: [number, number][];
    }[]
  ) {
    if (!checkDuplicateLocation([loc[0], loc[1]], locations)) {
      const newScore = scores[loc[0]][loc[1]] + score;
      answer = Math.max(answer, newScore);
      const modified: [number, number][] = [];
      for (let index = 0; index < locations.length; index++) {
        modified.push([...locations[index]] as [number, number]);
      }
      modified[index] = [loc[0], loc[1]];
      queue.push({
        score: newScore,
        arrival: arrival,
        locations: modified,
      });
    }
  };

  const arrivalTask = function (
    index: number,
    score: number,
    arrival: number,
    locations: [number, number][],
    queue: {
      score: number;
      arrival: number;
      locations: [number, number][];
    }[]
  ) {
    const modified: [number, number][] = [];
    for (let index = 0; index < locations.length; index++) {
      modified.push([...locations[index]] as [number, number]);
    }
    modified.splice(index, 1);
    queue.push({
      score: score,
      arrival: arrival + 1,
      locations: modified,
    });
  };

  let queue: {
    score: number;
    arrival: number;
    locations: [number, number][];
  }[] = [];

  queue.push({ score: 0, arrival: 0, locations: [] });

  for (const dice of dices) {
    const newQueue: {
      score: number;
      arrival: number;
      locations: [number, number][];
    }[] = [];
    for (const { score, arrival, locations } of queue) {
      if (arrival + locations.length < 4) {
        commonTask(
          [0, dice - 1],
          locations.length,
          score,
          arrival,
          locations,
          newQueue
        );
      }
      for (let index = 0; index < locations.length; index++) {
        const location = locations[index];
        if (location[0] === 0) {
          if (
            scores[0][location[1]] % 10 === 0 &&
            scores[0][location[1]] !== 40
          ) {
            const quota = scores[0][location[1]] / 10;
            if (dice <= scores[quota].length) {
              commonTask(
                [quota, dice - 1],
                index,
                score,
                arrival,
                locations,
                newQueue
              );
            } else {
              const newLoc = dice - scores[quota].length - 1;
              commonTask(
                [4, newLoc],
                index,
                score,
                arrival,
                locations,
                newQueue
              );
            }
          } else {
            const newLoc = location[1] + dice;
            if (newLoc < scores[0].length) {
              commonTask(
                [0, newLoc],
                index,
                score,
                arrival,
                locations,
                newQueue
              );
            } else {
              arrivalTask(index, score, arrival, locations, newQueue);
            }
          }
        } else if (location[0] > 0 && location[0] < 4) {
          if (location[1] + dice < scores[location[0]].length) {
            commonTask(
              [location[0], location[1] + dice],
              index,
              score,
              arrival,
              locations,
              newQueue
            );
          } else if (
            location[1] + dice <
            scores[location[0]].length + scores[4].length
          ) {
            const newLoc = location[1] + dice - scores[location[0]].length;
            commonTask([4, newLoc], index, score, arrival, locations, newQueue);
          } else if (
            location[1] + dice ===
            scores[location[0]].length + scores[4].length
          ) {
            commonTask([0, 19], index, score, arrival, locations, newQueue);
          } else {
            arrivalTask(index, score, arrival, locations, newQueue);
          }
        } else {
          if (location[1] + dice < scores[4].length) {
            commonTask(
              [4, location[1] + dice],
              index,
              score,
              arrival,
              locations,
              newQueue
            );
          } else if (location[1] + dice === scores[4].length) {
            commonTask([0, 19], index, score, arrival, locations, newQueue);
          } else {
            arrivalTask(index, score, arrival, locations, newQueue);
          }
        }
      }
    }
    queue = newQueue;
  }
  console.log(answer);
};

solution(dices);
