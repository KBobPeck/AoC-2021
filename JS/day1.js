const fs = require('fs')

const input = require("../uploads/day1");

// part one
let answerA = 0;

for (let i = 0; i < input.length - 1; i++) {
  if (input[i] < input[i + 1]) answerA++;
}

console.log(answerA);

//part two
let answerB = 0;
for (let i = 0; i < input.length - 3; i++) {
  if(input[i] < input[i+3]) answerB++
}

console.log(answerB);

fs.writeFileSync('../out/day1.json', JSON.stringify({answerA, answerB}), {encoding:'utf-8', flag:'w'})