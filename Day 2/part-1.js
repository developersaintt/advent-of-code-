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

const calculateScore = (player1Move, player2Move) => {

  // Draw Case
  if (p1MoveMap[player1Move] == p2MoveMap[player2Move]) {
    return 3 + moveScore[p2MoveMap[player2Move]]
  }


  // Lose Case
  if (p1MoveMap[player1Move] == "rock" && p2MoveMap[player2Move] == "scissors") {
    return 0 + moveScore[p2MoveMap[player2Move]]
  }

  if (p1MoveMap[player1Move] == "paper" && p2MoveMap[player2Move] == "rock") {
    return 0 + moveScore[p2MoveMap[player2Move]]
  }

  if (p1MoveMap[player1Move] == "scissors" && p2MoveMap[player2Move] == "paper") {
    return 0 + moveScore[p2MoveMap[player2Move]]
  }



  // Win Case
  if (p1MoveMap[player1Move] == "rock" && p2MoveMap[player2Move] == "paper") {
    return 6 + moveScore[p2MoveMap[player2Move]]
  }

  if (p1MoveMap[player1Move] == "paper" && p2MoveMap[player2Move] == "scissors") {
    return 6 + moveScore[p2MoveMap[player2Move]]
  }

  if (p1MoveMap[player1Move] == "scissors" && p2MoveMap[player2Move] == "rock") {
    return 6 + moveScore[p2MoveMap[player2Move]]
  }

}

const fileData = syncReadFile(`${__dirname}/moves.txt`)

console.log(fileData)

const finalResults = fileData.map(move => {
  return calculateScore(move.split(' ')[0], move.split(' ')[1])
})

console.log(finalResults.reduce((accumulator, currentValue) => {
  return parseFloat(accumulator) + parseFloat(currentValue)
}, 0))