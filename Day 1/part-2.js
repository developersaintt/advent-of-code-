// Part 2

const { readFileSync, promises } = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const getMax = (a, b) => Math.max(a, b);

const fileData = syncReadFile(`${__dirname}/calories.txt`);
console.log(fileData)
let finalArray = [];
let initialValue = 0;
fileData.reduce((accumulator, currentValue) => {
  if (currentValue == '') {
    finalArray.push(accumulator)
    initialValue = 0
    return 0
  }
  return parseFloat(accumulator) + parseFloat(currentValue)
}, initialValue)

const top3 = finalArray
  .sort((a, b) => { return a - b })
  .splice(finalArray.length - 3, finalArray.length)
  .reduce((accumulator, currentValue) => {
    return parseFloat(accumulator) + parseFloat(currentValue)
  }, 0)

console.log(top3)
