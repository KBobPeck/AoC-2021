const input = require("../uploads/day9");
const fs = require("fs");

const answerA = { final: 0 };

//r is for row,
//c is for column
//we check to see if the value exists, if it does then we use it if not we give it a value of -1 to make sure it is less
const maxRows = input.length;
const maxCols = input[0].length;
console.log(maxRows, maxCols);
for (r in input) {
  for (c in input[r]) {
    const current = input[r][c];
    let up, down, left, right;
    if (r == 99) {
      up = -1;
    } else if (r == 0) {
      down = -1;
    }

    if (c == 99) {
      right = -1;
    } else if (c == 0) {
      left = -1;
    }
    console.log(r, c, input[+r][c], right);
    if (!up) up = input[+r + 1][c];
    if (!down) down = input[+r - 1][c];
    if (!right) right = input[r][+c + 1];
    if (!left) left = input[r][+c - 1];

    if (current > right && current > left && current > up && current > down) {
      answerA.final += +current + 1;
    }
  }
}

const answerB = { final: 0 };

fs.writeFileSync("../out/day9.json", JSON.stringify({ answerA, answerB }), {
  encoding: "utf-8",
  flag: "w",
});
``;
