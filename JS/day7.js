const input = require("../uploads/day7");
const fs = require("fs");

const answerA = { final: 0 };

const sorted = input.sort((a, b) => a - b);
let middleIndex = input.length / 2;
answerA.median =
  middleIndex % 2
    ? +sorted[Math.floor(middleIndex)] + sorted[Math.ceil(middleIndex)]
    : +sorted[middleIndex];

sorted.forEach((each) => {
  answerA.final += Math.abs(each - answerA.median);
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Part 2

const answerB = { final: 0 };

//I tested floor and ciel
//floor was slightly smaller even though ceil was closer in the round
answerB.mean = Math.floor(
  sorted.reduce((prev, curr) => +prev + +curr) / sorted.length
);

sorted.forEach((each) => {
  answerB.final += Math.abs(
    0.5 * Math.abs(each - answerB.mean) ** 2 +
      0.5 * Math.abs(each - answerB.mean)
  );
});

fs.writeFileSync("../out/day7.json", JSON.stringify({ answerA, answerB }), {
  encoding: "utf-8",
  flag: "w",
});
