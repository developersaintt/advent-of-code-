// Part 1

const { readFileSync, promises } = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const getMax = (a, b) => Math.max(a, b);

const fileData = syncReadFile(`${__dirname}/calories.txt`);
let finalArray = [];
let initialValue = 0;
fileData.reduce((accumulator, currentValue) => {
  if(currentValue == '') {
    finalArray.push(accumulator)
    initialValue = 0
    return 0
  }
  return parseFloat(accumulator) + parseFloat(currentValue)
}, initialValue)

console.log(finalArray.reduce(getMax, 50))