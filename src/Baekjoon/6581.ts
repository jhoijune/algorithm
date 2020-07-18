import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source)
  .toString()
  .trim()
  .split(/\s/)
  .filter((v) => v.length);

const solution = (inputs: string[]) => {
  let length = 0;
  let words: string[] = [];

  const print = () => {
    console.log(words.join(' '));
    length = 0;
    words = [];
  };

  for (const input of inputs) {
    if (input === '<br>') {
      print();
    } else if (input === '<hr>' && words.length === 0) {
      console.log('-'.repeat(80));
    } else if (input === '<hr>') {
      print();
      console.log('-'.repeat(80));
    } else {
      if (length + input.length + words.length > 80) {
        print();
        length = input.length;
        words = [input];
      } else {
        length += input.length;
        words.push(input);
      }
    }
  }
  print();
};

solution(input);
