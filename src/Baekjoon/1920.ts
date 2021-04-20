import { readFileSync } from "fs";

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const num1 = input[1].trim().split(' ').map((v) => Number(v));
const num2 = input[3].trim().split(' ').map((v) => Number(v));

const solution = function(num1:number[],num2:number[]){
  num1.sort((a,b) => a-b);
  num2.forEach((number) => {
    let low = 0;
    let high = num1.length - 1;
    let found = false;
    while(low <= high && !found){
      const mid = Math.floor((low+high)/2);
      if(num1[mid] < number){
        low = mid + 1;
      } else if(num1[mid] > number){
        high = mid -1;
      } else {
        found = true;
      }
    }
    console.log(found ? 1: 0);
  });
}

solution(num1,num2);