import {readFileSync} from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const solution = function(numbers:string[],index:number,curr:string[]){
  if(index === numbers.length){
    return;
  }
  curr.push(numbers[index]);
  if(curr.length === 6){
    console.log(curr.join(' '));
  }
  solution(numbers,index+1,curr);
  curr.pop();
  solution(numbers,index+1,curr);
}

input.forEach((value,index) => {
  const [count,...numbers] = value.trim().split(' ');
  if(count === '0'){
    return;
  } else if(index !== 0){
    console.log('\r ');
  }
  solution(numbers,0,[]);
})