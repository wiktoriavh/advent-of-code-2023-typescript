import { Solution } from './types';

type Position = {
  [arrayNum: number]: {
    [index: number]: true;
  };
};

const solution = (input: string): Solution => {
  const lines = input.split('\n').map((line) => line.split(''));

  const partNumber = new Map<string, string>();

  function checkingSurroundings(arrayNum: number, index: number) {
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
    surroundings.forEach(([x, y]) => {
      if (isNumber(lines[x][y])) {
        const startingIndex = goToStartingIndex(y, lines[x]);
        if (partNumber.has(`${x},${startingIndex}`)) return;
        const fullNumber = [...getFullNumber(startingIndex, lines[x])].join('');
        partNumber.set(`${x},${startingIndex}`, fullNumber);
      }
    });
  }

  lines.forEach((line, x) => {
    line.forEach((symbol, y) => {
      if (isSymbol(symbol)) {
        checkingSurroundings(x, y);
      }
    });
  });

  const values = partNumber.values();
  const sum = [...values].reduce((acc, curr) => acc + Number(curr), 0);

  return { part1: sum.toString(), part2: '0' };
};

export default solution;

function goToStartingIndex(index: number, arr: string[]) {
  let startingIndex = index;
  const prev = arr[index - 1];
  if (isNumber(prev)) {
    startingIndex--;
    goToStartingIndex(index, arr);
  }
  return startingIndex;
}

function* getFullNumber(index: number, arr: string[]) {
  while (true) {
    const number = arr[index];
    if (isNumber(number)) {
      yield number;
      index++;
    } else {
      break;
    }
  }
}

function isNumber(symbol: string) {
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  return nums.includes(symbol);
}

function isSymbol(symbol: string) {
  if (symbol === '.') return false;
  if (isNumber(symbol)) return false;
  return true;
}
