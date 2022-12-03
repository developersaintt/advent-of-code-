const { readFileSync, promises } = require('fs');

const syncReadFile = (filePath) => {
  const contents = readFileSync(filePath, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const rackSacks = syncReadFile('./input.txt')

function filterUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const characterToPriority = (char) => {
  const charArray = Array.from("abcdefghijklmnopqrstuvwxyz".split(''))

  if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
    return charArray.indexOf(char.toLocaleLowerCase()) + 1 + 26
  }
  return charArray.indexOf(char) + 1
}

let finalScore = 0;
let groups = []

for (let i = 0; i < rackSacks.length; i= i+3) {
  groups.push([rackSacks[i], rackSacks[i+1], rackSacks[i+2]])
}

groups.forEach((group, index) => {
  // if(index > 0) return
  const compartment1 = Array.from(group[0]).filter(filterUnique)
  const compartment2 = Array.from(group[1]).filter(filterUnique)
  const compartment3 = Array.from(group[2]).filter(filterUnique)

  const hashMap = {};
  Array.from(compartment1).forEach(itm => hashMap[itm] = 1)
  Array.from(compartment2).forEach(itm => hashMap[itm] ? hashMap[itm] = hashMap[itm] + 1 : hashMap[itm] = 1)
  Array.from(compartment3).forEach(itm => hashMap[itm] ? hashMap[itm] = hashMap[itm] + 1 : hashMap[itm] = 1)

  const filteredObj = Object.fromEntries(
    Object.entries(hashMap).filter(
      ([_, value]) => value == 3
    )
  );

  Object.entries(filteredObj).map(
    ([key, value]) => {
      finalScore += characterToPriority(key)
    }
  )

})
console.log(finalScore)