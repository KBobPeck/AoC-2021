const input = require("../uploads/day2");
const fs = require('fs')

let data = input.split("\n").map((each) => each.split(" "));

// part one
let answerA = {x: 0, y:0, final:0}
data.forEach((each) => {
  switch (each[0]) {
    case "forward":
      answerA.x += +each[1];
      break;
    case "down":
      answerA.y += +each[1];
      break;
    case "up":
      answerA.y -= +each[1];
      break;
    default:
      break;
  }
});

answerA.final = answerA.x * answerA.y
console.log(answerA.final);

// part two
let answerB = {x: 0, y:0, aim:0, final:0}

data.forEach((each) => {
  switch (each[0]) {
    case "forward":
      answerB.x += +each[1];
      answerB.y += answerB.aim * +each[1]
      break;
    case "down":
      answerB.aim += +each[1];
      break;
    case "up":
      answerB.aim -= +each[1];
      break;
    default:
      break;
  }
});

answerB.final = answerB.x * answerB.y
console.log(answerB.final);


fs.writeFileSync('../out/day2.json', JSON.stringify({answerA, answerB}) , {encoding:'utf-8', flag:'w'})
