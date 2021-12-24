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
  *pos3 = #1 - pos2
  !#5 is the 5 size one missing pos2
  *pos5 = #5 + pos2 - #8
  !#0 is the 6 size that includes pos5
  !#9 is the last 6 size
  //pos7 = #8 - #0
  //pos6 = #4 - pos2 - pos3 - pos7
  !#2 is the size 5 missing pos3
  !#3 is the remaining size 5 
*/

left.forEach(each => {
  const splitLeft = each.split(' ');

  //stores the sorted sizes
  answerB.sorted={}
  //stores the letters that belong to that corresponding number
  answerB.numberLetters={}

  //this sorts the letters into their corresponding sizes
  splitLeft.forEach(each => {
    const length = each.length
    answerB.sorted[length] 
      ? answerB.sorted[length].push(each)
      :answerB.sorted[length] = [each] 
  })

answerB.numberLetters['1'] = answerB.sorted
})


fs.writeFileSync("../out/day8.json", JSON.stringify({ answerA, answerB }), {
  encoding: "utf-8",
  flag: "w",
});
