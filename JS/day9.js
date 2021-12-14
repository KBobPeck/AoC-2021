const input = require("../uploads/day9");
const fs = require("fs");

const answerA = { final: 0 };

console.log(input);

//r is for row,
//c is for column
//we check to see if the value exists, if it does then we use it if not we give it a value of -1 to make sure it is less
for(r of input){
  for(c of input[r]){
    const current = input[r][c]
    const right = input[r+1][c] ? input[r+1][c] : -1
    const left = input[r-1][c] ? input[r+1][c] : -1
    const up = input[r][c+1] ? input[r+1][c] : -1
    const down = input[r][c-1] ? input[r+1][c] : -1

    if(current > right && current > left && current > up && current >down){
      answerA.final += current + 1
    }
  }
}

const answerB = { final: 0 };

fs.writeFileSync("../out/day9.json", JSON.stringify({ answerA, answerB }), {
  encoding: "utf-8",
  flag: "w",
});``