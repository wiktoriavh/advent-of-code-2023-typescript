import { Solution } from './types';

const solution = (input: string): Solution => {
  const lines = input.split('\n').map((line) => line.split(''));

  const partNumbers: string[] = [];

  function isPartNumber(arrayNum: number, index: number) {
    const surroundings = [
      [arrayNum - 1, index - 1],
      [arrayNum - 1, index],
      [arrayNum - 1, index + 1],
      [arrayNum, index - 1],
      [arrayNum, index + 1],
      [arrayNum + 1, index - 1],
      [arrayNum + 1, index],
      [arrayNum + 1, index + 1],
    ];

    let isPartNumber = false;

    for (let i = 0; i < surroundings.length; i++) {
      const [x, y] = surroundings[i];
      const withinBounds =
        x >= 0 && x < lines.length && y >= 0 && y < lines[x].length;
      if (!withinBounds) {
        continue;
      }
      if (isSymbol(lines[x][y])) {
        isPartNumber = true;
        break;
      }
    }
    return isPartNumber;
  }

  lines.forEach((line, x) => {
    let foundNumber = '';
    let isFoundPartNumber = false;
    for (let i = 0; i < line.length; i++) {
      const num = line[i];
      if (isNumber(num)) {
        foundNumber += num;
        if (!isFoundPartNumber) {
          isFoundPartNumber = isPartNumber(x, i);
        }
      } else {
        if (isFoundPartNumber) {
          partNumbers.push(foundNumber);
        }
        isFoundPartNumber = false;
        foundNumber = '';
      }
    }
  });

  return {
    part1: partNumbers.reduce((acc, curr) => acc + Number(curr), 0).toString(),
    part2: '0',
  };
};

export default solution;

function isNumber(symbol: string) {
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  return nums.includes(symbol);
}

function isSymbol(symbol: string) {
  if (symbol === '.') return false;
  if (isNumber(symbol)) return false;
  return true;
}
