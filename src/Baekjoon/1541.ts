
import { readFileSync } from "fs";

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim();

const solution = function(input:string){
  const nums = input.split(/[+-]/).map((v) =>parseInt(v));
  const operators = input.match(/[+-]/g)!;
  let answer = Infinity;
  const DFS = function(nums:number[],operators:string[]){
    if(operators.length === 0){
      answer = Math.min(answer,nums[0]);
      return;
    }
    for(let index=0;index<operators.length;index++){
      const newNums = [...nums];
      const newOperators = [...operators];
      const sum = newOperators[index] === '+' ? newNums[index] + newNums[index+1]: newNums[index] - newNums[index+1];
      newNums.splice(index,2,sum);
      newOperators.splice(index,1);
      DFS(newNums,newOperators);
    }
  }
  DFS(nums,operators);
  console.log(answer);
}


solution(input);
