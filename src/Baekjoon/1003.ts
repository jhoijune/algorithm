import { readFileSync } from "fs";

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const nums:number[] = [];
for(let index=1;index<input.length;index++){
  nums.push(Number(input[index].trim()));
}

const solution = function(nums:number[]){
  const max = Math.max(...nums);
  const dp:[number,number][] = [[1,0],[0,1]];
  while(dp.length  < max + 1){
    const size = dp.length;
    const newZero = dp[size-1][0] + dp[size-2][0];
    const newOne = dp[size-1][1] + dp[size-2][1];
    dp.push([newZero,newOne]);
  }
  for(const num of nums){
    const [zero,one] = dp[num];
    console.log(`${zero} ${one}`);
  }
}

solution(nums);