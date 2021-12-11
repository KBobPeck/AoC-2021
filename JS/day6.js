const input = require("../uploads/day6").split(",");
const fs = require("fs");

const answerA = {
  currTotals: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
};

input.forEach((each) => answerA.currTotals[each]++);

for (let i = 0; i < 80; i++) {
  answerA.prevTotals = answerA.currTotals;
  answerA.currTotals = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
  const { prevTotals: prev, currTotals: curr } = answerA;

  const prevMap = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  const currMap = [8, 6, 0, 1, 2, 3, 4, 5, 6, 7];

  prevMap.forEach((each, index) => {
    curr[currMap[index]] += prev[prevMap[index]];
  });
}

answerA.final = 0;
Object.values(answerA.currTotals).forEach((each) => (answerA.final += each));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Part 2

const answerB = {
  currTotals: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
};

input.forEach((each) => answerB.currTotals[each]++);

for (let i = 0; i < 256; i++) {
  answerB.prevTotals = answerB.currTotals;
  answerB.currTotals = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
  const { prevTotals: prev, currTotals: curr } = answerB;

  const prevMap = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  const currMap = [8, 6, 0, 1, 2, 3, 4, 5, 6, 7];

  prevMap.forEach((each, index) => {
    curr[currMap[index]] += prev[prevMap[index]];
  });
}

answerB.final = 0;
Object.values(answerB.currTotals).forEach((each) => (answerB.final += each));

fs.writeFileSync("../out/day6.json", JSON.stringify({ answerA, answerB }), {
  encoding: "utf-8",
  flag: "w",
});
