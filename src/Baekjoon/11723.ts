import { readFileSync } from 'fs';

const source = __dirname + '/input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const commands = input.slice(1).map((v) => v.trim());

const solution = function (commands: string[]) {
  const set = new Array<boolean>(20).fill(false);
  for (const command of commands) {
    const [action, charNum] = command.split(' ');
    const number = parseInt(charNum);
    switch (action) {
      case 'add': {
        set[number - 1] = true;
        break;
      }
      case 'remove': {
        set[number - 1] = false;
        break;
      }
      case 'check': {
        console.log(set[number - 1] ? 1 : 0);
        break;
      }
      case 'toggle': {
        set[number - 1] = !set[number - 1];
        break;
      }
      case 'all': {
        set.fill(true);
        break;
      }
      case 'empty': {
        set.fill(false);
        break;
      }
    }
  }
};

solution(commands);
