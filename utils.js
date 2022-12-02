const { readFileSync, promises } = require('fs');

export const syncReadFile = (filePath) => {
  const contents = readFileSync(filePath, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}