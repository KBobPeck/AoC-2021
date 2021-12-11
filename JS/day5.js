let input = require("../uploads/day5").split("\n");
const fs = require("fs");

let answerA = {};

answerA.validInputs = input.map((each) => {
  const temp = each.split(" -> ").join(",").split(",");
  return { x1: temp[0], y1: temp[1], x2: temp[2], y2: temp[3] };
});

answerA.validInputs = answerA.validInputs.filter((each) => {
  const { x1, x2, y1, y2 } = each;
  return x1 === x2 || y1 === y2;
});

answerA.grid = {};

answerA.validInputs.forEach((each) => {
  const { x1, y1, x2, y2 } = each;
  if (x1 == x2) {
    const min = Math.min(+y1, +y2);
    const max = Math.max(+y1, +y2);
    for (let i = min; i <= max; i++) {
      answerA.grid[`${x1} ${i}`]
        ? answerA.grid[`${x1} ${i}`]++
        : (answerA.grid[`${x1} ${i}`] = 1);
    }
  } else {
    const min = Math.min(+x1, +x2);
    const max = Math.max(+x1, +x2);
    for (let i = min; i <= max; i++) {
      answerA.grid[`${i} ${y1}`]
        ? answerA.grid[`${i} ${y1}`]++
        : (answerA.grid[`${i} ${y1}`] = 1);
    }
  }
});

answerA.final = 0;
Object.values(answerA.grid).forEach((each) => {
  if (each > 1) answerA.final++;
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Part 2

let answerB = {};

answerB.validInputs = input.map((each) => {
  const temp = each.split(" -> ").join(",").split(",");
  return { x1: temp[0], y1: temp[1], x2: temp[2], y2: temp[3] };
});

answerB.validInputs = answerB.validInputs.filter((each) => {
  const { x1, x2, y1, y2 } = each;

  return x1 === x2 || y1 === y2 || ((x2 - x1) / (y2 - y1)) ** 2 == 1;
});

answerB.grid = {};

answerB.validInputs.forEach((each) => {
  const { x1, y1, x2, y2 } = each;
  if (x1 == x2) {
    const min = Math.min(+y1, +y2);
    const max = Math.max(+y1, +y2);
    for (let i = min; i <= max; i++) {
      answerB.grid[`${x1} ${i}`]
        ? answerB.grid[`${x1} ${i}`]++
        : (answerB.grid[`${x1} ${i}`] = 1);
    }
  } else if (y1 == y2) {
    const min = Math.min(+x1, +x2);
    const max = Math.max(+x1, +x2);
    for (let i = min; i <= max; i++) {
      answerB.grid[`${i} ${y1}`]
        ? answerB.grid[`${i} ${y1}`]++
        : (answerB.grid[`${i} ${y1}`] = 1);
    }
  } else if ((x2 - x1) / (y2 - y1) == 1) {
    const minx = Math.min(+x1, +x2);
    const miny = Math.min(+y1, +y2);
    const max = Math.max(+x1, +x2);
    for (let i = 0; i <= Math.abs(max - minx); i++) {
      answerB.grid[`${minx + i} ${miny + i}`]
        ? answerB.grid[`${minx + i} ${miny + i}`]++
        : (answerB.grid[`${minx + i} ${miny + i}`] = 1);
    }
  } else if ((x2 - x1) / (y2 - y1) == -1) {
    const minx = Math.min(+x1, +x2);
    const maxy = Math.max(+y1, +y2);
    const max = Math.max(+x1, +x2);
    for (let i = 0; i <= Math.abs(max - minx); i++) {
      answerB.grid[`${minx + i} ${maxy - i}`]
        ? answerB.grid[`${minx + i} ${maxy - i}`]++
        : (answerB.grid[`${minx + i} ${maxy - i}`] = 1);
    }
  }
});

answerB.final = 0;
Object.values(answerB.grid).forEach((each) => {
  if (each > 1) answerB.final++;
});

answerB.grid = "removed for readability, please comment line 110 to see";
answerB.validInputs = "removed for readability, please comment line 111 to see";

answerA.grid = "removed for readability, please comment line 113 to see";
answerA.validInputs = "removed for readability, please comment line 114 to see";

fs.writeFileSync("../out/day5.json", JSON.stringify({ answerA, answerB }), {
  encoding: "utf-8",
  flag: "w",
});
// console.table(answerA.grid);
