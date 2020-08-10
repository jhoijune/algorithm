import {} from 'module';

const solution = function (expression: string): number {
  const numbers = expression.split(/[-+*]/)!.map((v) => Number(v));
  const operations = expression.match(/[-+*]/gi)!;
  let answer = 0;

  const DFS = function (numbers: number[], operations: string[]) {
    if (operations.length === 0) {
      answer = Math.max(answer, Math.abs(numbers[0]));
      return;
    }
    const avail = new Set<string>(operations);
    for (const operation of avail) {
      const newOp: string[] = [];
      const newNum = [...numbers];
      const size = operations.length;
      let count = 0;
      for (let index = 0; index < size; index++) {
        if (operations[index] === operation) {
          switch (operation) {
            case '+': {
              const calc = newNum[index - count] + newNum[index - count + 1];
              newNum.splice(index - count, 2, calc);
              break;
            }
            case '-': {
              const calc = newNum[index - count] - newNum[index - count + 1];
              newNum.splice(index - count, 2, calc);
              break;
            }
            case '*': {
              const calc = newNum[index - count] * newNum[index - count + 1];
              newNum.splice(index - count, 2, calc);
              break;
            }
          }
          count += 1;
        } else {
          newOp.push(operations[index]);
        }
      }
      DFS(newNum, newOp);
    }
  };
  DFS(numbers, operations);
  return answer;
};

console.log(solution('100-200*300-500+20'));
