import {readFileSync} from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [M,N] = input[0].split(' ').map((v) => Number(v));

const board:string[] = [];

for(let row=1;row<=M;row++){
  board.push(input[row].trim());
}



const solution = function(board:string[],M:number,N:number){
  let answer = 8*8;
  for(let row=0;row<=M-8;row++){
    for(let col=0;col<=N-8;col++){
      let bCount = 0;
      let wCount = 0;
      for(let rowInc=0;rowInc<8;rowInc++){
        for(let colInc=0;colInc<8;colInc++){
          if((rowInc+colInc) % 2 === 0){
            if(board[row+rowInc][col+colInc] === 'B'){
              wCount += 1;
            } else {
              bCount += 1;
            }
          } else {
            if(board[row+rowInc][col+colInc] === 'B'){
              bCount += 1;
            } else {
             wCount += 1; 
            }
          }
        }
      }
      answer = Math.min(answer,bCount,wCount);
    }
  }
  console.log(answer);
}

solution(board,M,N);