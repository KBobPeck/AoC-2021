const { input, left, right } = require("../uploads/day8");
const fs = require("fs");
const answerA = { final: 0, checkedDigits: [2, 3, 4, 7] };

right
  .join(" ")
  .split(" ")
  .forEach((each) => {
    if (answerA.checkedDigits.includes(each.length)) answerA.final++;
  });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Part 2

const answerB = { final: 0 };

// we know 1, 4, 7, 8
/*
2 = 1
3 = 7
4 = 4
5 = 2 3 5
6 = 0 6 9 
7 = 8

the positions are     11
                    6    2
                      77
                    5    3
                      44
  !#1 is the size 2
  !#7 is the size 3
  !#4 is the size 4
  !#8 is the size 7
  //pos1 = #7 - #1
  !#6 is the 6 size one that does not have all of #1 included
  *pos2 = #8 - #6
  !#5 is the 5 size one missing pos2
  *pos5 = #5 + pos2 - #8
  !#0 is the 6 size that includes pos5
  !#9 is the last 6 size
  //pos7 = #8 - #0
  //pos6 = #4 - pos2 - pos3 - pos7
  *pos3 = #1 - pos2
  !#2 is the size 5 missing pos3
  !#3 is the remaining size 5 
*/

left.forEach((each, inputIndex) => {
  const splitLeft = each.split(" ");

  //stores the sorted sizes
  answerB.sorted = {};
  //stores the letters that belong to that corresponding number
  answerB.numberLetters = {};

  //this sorts the letters into their corresponding sizes
  splitLeft.forEach((each) => {
    const length = each.length;
    answerB.sorted[length]
      ? answerB.sorted[length].push(each)
      : (answerB.sorted[length] = [each]);
  });

  //#1 is the size 2
  answerB.numberLetters["1"] = answerB.sorted["2"][0].split("").sort().join("");
  //#7 is the size 3
  answerB.numberLetters["7"] = answerB.sorted["3"][0].split("").sort().join("");
  //#4 is the size 4
  answerB.numberLetters["4"] = answerB.sorted["4"][0].split("").sort().join("");
  //#8 is the size 7
  answerB.numberLetters["8"] = answerB.sorted["7"][0].split("").sort().join("");

  //#6 is the 6 size one that does not have all of #1 included
  answerB.sorted["6"].forEach((each, index) => {
    const num1Letters = answerB.numberLetters["1"].split("");
    if (!each.includes(num1Letters[0]) || !each.includes(num1Letters[1])) {
      answerB.numberLetters["6"] = each.split("").sort().join("");
      //removes #6 from the sorted array
      answerB.sorted["6"].splice(index, 1);
    }
  });

  //pos2 = #8 - #6
  const removal1 = answerB.numberLetters["6"].split("");
  const pos2 = answerB.numberLetters["8"]
    .split("")
    .filter((each) => !removal1.includes(each))[0];

  //#5 is the 5 size one missing pos2
  answerB.sorted["5"].forEach((each, index) => {
    if (!each.includes(pos2)) {
      answerB.numberLetters["5"] = each.split("").sort().join("");
      answerB.sorted["5"].splice(index, 1);
    }
  });

  //pos5 = #8 - (#5 + pos2)
  const removal2 = answerB.numberLetters["5"].split("");
  removal2.push(pos2);
  const pos5 = answerB.numberLetters["8"]
    .split("")
    .filter((each) => !removal2.includes(each))[0];

  //#0 is the 6 size that includes pos5
  answerB.sorted["6"].forEach((each, index) => {
    if (each.includes(pos5)) {
      answerB.numberLetters["0"] = each.split("").sort().join("");
      answerB.sorted["6"].splice(index, 1);
    }
  });

  //#9 is the last 6 size
  answerB.numberLetters["9"] = answerB.sorted["6"][0].split("").sort().join("");

  //pos3 = #1 - pos2
  const pos3 = answerB.numberLetters["1"]
    .split("")
    .filter((each) => each != pos2)[0];

  //#2 is the size 5 missing pos3
  answerB.sorted["5"].forEach((each, index) => {
    if (!each.includes(pos3)) {
      answerB.numberLetters["2"] = each.split("").sort().join("");
      answerB.sorted["5"].splice(index, 1);
    }
  });

  //#3 is the remaining size 5
  answerB.numberLetters["3"] = answerB.sorted["5"][0].split("").sort().join("");

  //AND NOW YOU HAVE A LIST OF EVERY NUMBER'S LETTERS
  answerB.rightNums = "";
  answerB.rightLetters = right[inputIndex]
  const orderedLetters = Object.values(answerB.numberLetters);

  //find the corresponding number for the letters
  right[inputIndex].split(" ").forEach((rightSide) => {
    const sortedRight = rightSide.split("").sort().join("")
    orderedLetters.forEach((ordered, index) => {
      if(sortedRight === ordered){
        answerB.rightNums += index
      }
    });
  });

  answerB.final += +answerB.rightNums
});

fs.writeFileSync("../out/day8.json", JSON.stringify({ answerA, answerB }), {
  encoding: "utf-8",
  flag: "w",
});
