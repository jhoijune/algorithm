const minDistance = function (word1: string, word2: string) {
  const chars: Set<string> = new Set(word2.split(''));
  let queue: string[] = [];
  const wordSet = new Set<string>();
  queue.push(word1);
  wordSet.add(word1);

  const addQueue = function (word: string, queue: string[]) {
    if (!wordSet.has(word)) {
      wordSet.add(word);
      queue.push(word);
    }
  };

  let count = 0;
  while (queue.length !== 0) {
    const newQueue: string[] = [];
    for (const word of queue) {
      if (word === word2) {
        return count;
      }
      const size = word.length;
      for (const char of chars) {
        const added = char + word;
        addQueue(added, newQueue);
      }
      for (let index = 0; index < size; index++) {
        const deleted = word.slice(0, index) + word.slice(index + 1);
        addQueue(deleted, newQueue);
        for (const char of chars) {
          const replaced = word.slice(0, index) + char + word.slice(index + 1);
          const added = word.slice(0, index + 1) + char + word.slice(index + 1);
          addQueue(replaced, newQueue);
          addQueue(added, newQueue);
        }
      }
    }
    queue = newQueue;
    count += 1;
  }
};

console.log(minDistance('horse', 'ros'));
