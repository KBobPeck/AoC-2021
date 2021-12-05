let input = require("../uploads/day3");
const fs = require("fs");

let answerA = { gamma: "", epsilon: "" };
// console.log(input);
input = input.split("\n");

input.forEach((each, i) => {
  for (x in each) {
    if (i === 0) answerA[x] = 0;
    if (+each[x] === 0) answerA[x] -= 1;
    else answerA[x] += 1;
    if (i === input.length - 1) {
      if (answerA[x] > 0) {
        answerA["gamma"] += 1;
        answerA["epsilon"] += 0;
      } else {
        answerA["gamma"] += 0;
        answerA["epsilon"] += 1;
      }
    }
  }
});

answerA["final"] =
  parseInt(answerA["gamma"], 2) * parseInt(answerA["epsilon"], 2);

console.log(answerA);

// Part 2
let answerB = {
  O2: JSON.parse(JSON.stringify(input)),
  CO2: JSON.parse(JSON.stringify(input)),
};
for (i = 0; i < input[0].length; i++) {
  let O2num = 0;
  let CO2num = 0;
  answerB["O2"].forEach((each) => {
    if (each[i] === "0") O2num -= 1;
    if (each[i] === "1") O2num += 1;
  });
  answerB["CO2"].forEach((each) => {
    if (each[i] === "0") CO2num -= 1;
    if (each[i] === "1") CO2num += 1;
  });
  // console.log(num);
  if (answerB["O2"].length > 1) {
    if (O2num >= 0) {
      answerB["O2"] = answerB["O2"].filter((each) => each[i] === "1");
    } else {
      answerB["O2"] = answerB["O2"].filter((each) => each[i] === "0");
    }
  }
  if (answerB["CO2"].length > 1) {
    if (CO2num >= 0) {
      answerB["CO2"] = answerB["CO2"].filter((each) => each[i] === "0");
    } else {
      answerB["CO2"] = answerB["CO2"].filter((each) => each[i] === "1");
    }
  }
}
answerB["final"] = parseInt(answerB["O2"], 2) * parseInt(answerB["CO2"], 2);
console.log(answerB);

fs.writeFileSync("../out/day3.json", JSON.stringify({ answerA, answerB }), {
  encoding: "utf-8",
  flag: "w",
});
