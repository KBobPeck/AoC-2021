const input = require("../uploads/day4").split("\n\n");
const fs = require('fs')

let answerA = {
  balls: input[0].split(","),
  boards: [...input.slice(1)].map((each) =>
    each
      .split("\n")
      .map((each) => each.split(" ").filter((each) => each !== ""))
  ),
  boardMatches: {},
};

let found = false;
// look at each ball
answerA.balls.forEach((ball) => {
  //look at each board
  if (!found) {
    answerA.boards.forEach((board, boardIndex) => {
      //look at each line in the board
      board.forEach((line, lineIndex) => {
        // find if the ball matched any numbers in the line,
        if (line.includes(ball)) {
          //if there is a match add a count to the corresponding board matches
          answerA.boardMatches[`b${boardIndex}r${lineIndex}`]
            ? (answerA.boardMatches[`b${boardIndex}r${lineIndex}`] += 1)
            : (answerA.boardMatches[`b${boardIndex}r${lineIndex}`] = 1);
          answerA.boardMatches[`b${boardIndex}c${line.indexOf(ball)}`]
            ? (answerA.boardMatches[
                `b${boardIndex}c${line.indexOf(ball)}`
              ] += 1)
            : (answerA.boardMatches[
                `b${boardIndex}c${line.indexOf(ball)}`
              ] = 1);
        }
      });
    });

    Object.entries(answerA.boardMatches).forEach((each) => {
      if (each[1] === 5) {
        //each[0] is a string like 'b2r0' where b is the index of the board and r/c is the row or col
        answerA.winner = each[0];
        answerA.winningNumber = ball;
        found = true;
      }
    });
  }
  // once youve checked every board then check to see if any rows or cols have 5 matches. (diagonals don't count)
});

answerA.winningBoard = answerA.boards[answerA.winner.match(/b(\d+)/)[1]].flat();
answerA.usedBalls = answerA.balls.slice(
  0,
  answerA.balls.indexOf(answerA.winningNumber) + 1
);
answerA.usedBalls.forEach((ball) => {
  const removal = answerA.winningBoard.indexOf(ball);
  if (removal > -1) answerA.winningBoard.splice(removal, 1);
});

answerA.final =
  answerA.winningBoard.reduce((prev, curr) => +prev + +curr) *
  answerA.winningNumber;

console.log(answerA);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Part 2

let answerB = {
  balls: input[0].split(","),
  boards: [...input.slice(1)].map((each) =>
    each
      .split("\n")
      .map((each) => each.split(" ").filter((each) => each !== ""))
  ),
  boardMatches: {},
  winningBoards: [],
};

let lastWinner = "";

// look at each ball
answerB.balls.forEach((ball) => {
  //look at each board
  if (answerB.winningBoards.length < answerB.boards.length) {
    answerB.boards.forEach((board, boardIndex) => {
      //look at each line in the board
      board.forEach((line, lineIndex) => {
        // find if the ball matched any numbers in the line,
        if (line.includes(ball)) {
          //if there is a match add a count to the corresponding board matches
          answerB.boardMatches[`b${boardIndex}r${lineIndex}`]
            ? (answerB.boardMatches[`b${boardIndex}r${lineIndex}`] += 1)
            : (answerB.boardMatches[`b${boardIndex}r${lineIndex}`] = 1);
          answerB.boardMatches[`b${boardIndex}c${line.indexOf(ball)}`]
            ? (answerB.boardMatches[
                `b${boardIndex}c${line.indexOf(ball)}`
              ] += 1)
            : (answerB.boardMatches[
                `b${boardIndex}c${line.indexOf(ball)}`
              ] = 1);
        }
      });
    });
    if (answerB.winningBoards.length < 100) {
      Object.entries(answerB.boardMatches).forEach((each) => {
        if (each[1] === 5) {
          //each[0] is a string like 'b2r0' where b is the index of the board and r/c is the row or col
          tempWinner = each[0];
          answerB.winningNumber = ball;
          if (
            !answerB.winningBoards.includes(tempWinner.match(/b(\d+)/)[1])
          ) {
            answerB.winner = each[0]
            answerB.winningBoards.push(answerB.winner.match(/b(\d+)/)[1]);
            answerB.winningBoard =
              answerB.boards[answerB.winner.match(/b(\d+)/)[1]].flat();
          }
          answerB.boardMatches[each[0]] = 'WON!';
        }
      });
    }
  }
  // once youve checked every board then check to see if any rows or cols have 5 matches. (diagonals don't count)
});

answerB.usedBalls = answerB.balls.slice(
  0,
  answerB.balls.indexOf(answerB.winningNumber) + 1
);
answerB.usedBalls.forEach((ball) => {
  const removal = answerB.winningBoard.indexOf(ball);
  if (removal > -1) answerB.winningBoard.splice(removal, 1);
});

answerB.final =
  answerB.winningBoard.reduce((prev, curr) => +prev + +curr) *
  answerB.winningNumber;

console.log(answerB);

fs.writeFileSync('../out/day4.json', JSON.stringify({answerA, answerB}) , {encoding:'utf-8', flag:'w'})


//SADNESS BELOW
// const [line, dir, num] = answerA.winningBoard.match(/([rc])(\d+)/);

// console.log(answerA.boards[answerA.winningBoard.match(/b(\d+)/)[1]]);

// if (dir == "r") {
//   answerA.sum = board[num].reduce((prev, curr) => +prev + +curr);
// }
// if (dir == "c") {
//   answerA.sum = 0;
//   board.forEach((line) => {
//     answerA.sum += +line[num];
//   });
// }

// answerA.final = answerA.sum * answerA.winningNumber
