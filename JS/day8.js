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

// find the 1, 4, 7, 8 numbers and define the ones we know
// The bars are numbered clockwise starting the top and then the middle in number 7
// {1: 2: 3: 4: 5: 6: 7:} and then there will be a list of not possibles for that section.

// check 1 is there only 1 more place the letter can go
// check 2 is there only 1 letter missing from that place

const possible = {
  1: ["a", "b", "c", "d", "e", "f", "g"],
  2: ["a", "b", "c", "d", "e", "f", "g"],
  3: ["a", "b", "c", "d", "e", "f", "g"],
  4: ["a", "b", "c", "d", "e", "f", "g"],
  5: ["a", "b", "c", "d", "e", "f", "g"],
  6: ["a", "b", "c", "d", "e", "f", "g"],
  7: ["a", "b", "c", "d", "e", "f", "g"],
};

input.forEach((each, index) => {
  const fullString = each.split(" | ").join(" ").split(" ");
  let thisPossible = { ...possible };

  for (word of fullString) {
    if (word.length == 2) {
      const [letter1, letter2] = word;
      let tempFilterList = ["a", "b", "c", "d", "e", "f", "g"].filter(
        (each) => each != letter1 || each != letter2
      );
      for (i = 1; i <= 7; i++) {
        thisPossible[i] = thisPossible[i].filter((each) => each != letter1 || each != letter2)
      }
    } else if (word.length == 3) {
    } else if (word.length == 4) {
    } else if (word.length == 7) {
    }
  }

  // console.log(thisPossible);
});

// console.log(input);

fs.writeFileSync("../out/day8.json", JSON.stringify({ answerA }), {
  encoding: "utf-8",
  flag: "w",
});
