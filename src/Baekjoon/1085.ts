import { readFileSync } from "fs";

const source = __dirname + '\\input.txt';
const [x,y,w,h] = readFileSync(source).toString().trim().split(' ').map((v) => Number(v));

const solution = function(x:number,y:number,w:number,h:number){
  console.log(Math.min(x,y,w-x,h-y));
}

solution(x,y,w,h);