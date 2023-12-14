import { Solution } from './types';

const solution = (input: string): Solution => {
  const lines = input.split('\n').map((line) => line.split(' ').map(Number));
  const result: number[] = [];
  const negativResult: number[] = [];

  lines.forEach((line) => {
    let history = [line];
    let index = 0;
    let next: number[] = [];
    let isSearching = true;
    while (isSearching) {
      const current = history[index];
      for (let i = 0; i + 1 < current.length; i++) {
        const currentNumber = current[i];
        const nextNumber = current[i + 1];
        const diff = nextNumber - currentNumber;
        next.push(diff);
      }

      index++;

      if (next.every((line) => line === 0)) {
        isSearching = false;
      }
      history.push(next);
      next = [];
    }

    index--;
    let current = 0;
    let prev = 0;

    for (index; index >= 0; index--) {
      current = history[index].at(-1)! + current;
      prev = history[index].at(0)! - prev;
    }
    result.push(current);
    negativResult.push(prev);
  });

  const part1 = result.reduce((acc, cur) => acc + cur, 0).toString();
  const part2 = negativResult.reduce((acc, cur) => acc + cur, 0).toString();
  return { part1, part2 };
};

export default solution;
