import { readFileSync } from "fs";

const source  = __dirname + '\\input.txt';
const [N,r,c] = readFileSync(source).toString().trim().split(' ').map((v) => Number(v));

const solution = function(N:number,r:number,c:number,sum:number):number{
  const div = Math.pow(2,N-1);
  let curr = 0;
  if(c >= div){
    curr += div*div;
  }
  if(r >= div){
    curr += 2*div*div;
  }
  if(N === 1){
    return sum + curr;
  }
  return solution(N-1,r%div,c%div,sum+curr);
}

console.log(solution(N,r,c,0));