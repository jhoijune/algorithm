import { readFileSync } from "fs";

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const words:string[] = [];

for(let line=1;line<input.length;line++){
  words.push(input[line].trim());
}

const solution = function(words:string[]){
  words.sort((a,b) => {
    let comp = a.length - b.length;
    let index = 0;
    const size = a.length;
    while(comp === 0 && index < size){
      if(a[index] < b[index]){
        comp = -1;
      } else if(a[index] > b[index]){
        comp = 1;
      } else {
        comp = 0;
        index += 1;
      }
    }
    return comp;
  });
  let ex:null|string = null;
  words.forEach((word)=>{
    if(ex === null || ex !== word){
      console.log(word);
      ex = word;
    }
  });
}

solution(words);