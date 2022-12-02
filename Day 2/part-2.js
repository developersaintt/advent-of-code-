const { readFileSync, promises } = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const moveScore = {
  rock: 1,
  paper: 2,
  scissors: 3
}

const p1MoveMap = {
  A: "rock",
  B: "paper",
  C: "scissors"
}

const p2MoveMap = {
  X: p1MoveMap.A,
  Y: p1MoveMap.B,
  Z: p1MoveMap.C
}

const getWinningMove = (move) => {
  switch (move) {
    case "rock":
      return "paper"
    case "paper":
      return "scissors"
    case "scissors":
      return "rock"
  }
}

const getLosingMove = (move) => {
  switch (move) {
    case "rock":
      return "scissors"
    case "paper":
      return "rock"
    case "scissors":
      return "paper"
  }
}

const calculateScore = (player1Move, player2Move) => {

  const p1Move = p1MoveMap[player1Move];
  let p2Move;

  switch (player2Move) {
    case "X":
      p2Move = getLosingMove(p1MoveMap[player1Move]);
      break
    case "Y":
      p2Move = p1MoveMap[player1Move]
      break
    case "Z":
      p2Move = getWinningMove(p1MoveMap[player1Move]);
      break
  }

  // Draw Case
  if (p1Move == p2Move) {
    return 3 + moveScore[p2Move]
  }

  // Lose Case
  if (p1Move == "rock" && p2Move == "scissors") {
    return 0 + moveScore[p2Move]
  }

  if (p1Move == "paper" && p2Move == "rock") {
    return 0 + moveScore[p2Move]
  }

  if (p1Move == "scissors" && p2Move == "paper") {
    return 0 + moveScore[p2Move]
  }



  // Win Case
  if (p1Move == "rock" && p2Move == "paper") {
    return 6 + moveScore[p2Move]
  }

  if (p1Move == "paper" && p2Move == "scissors") {
    return 6 + moveScore[p2Move]
  }

  if (p1Move == "scissors" && p2Move == "rock") {
    return 6 + moveScore[p2Move]
  }

}

const fileData = syncReadFile(`${__dirname}/moves.txt`)

const finalResults = fileData.map(move => {
  return calculateScore(move.split(' ')[0], move.split(' ')[1])
})

console.log(finalResults.reduce((accumulator, currentValue) => {
  return parseFloat(accumulator) + parseFloat(currentValue)
}, 0))