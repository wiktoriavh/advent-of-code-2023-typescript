import { Solution } from './types';

const solution = (input: string): Solution => {
  const lines = input
    .replaceAll(/card\s+\d+:/gi, '')
    .replaceAll('  ', ' ')
    .split('\n')
    .map((line) => line.split(' | '))
    .map((line) =>
      line.map((card) =>
        card
          .trim()
          .split(' ')
          .map((n) => parseInt(n.trim(), 10)),
      ),
    );

  const result = lines.reduce((acc, [winning, drawn]) => {
    let points = 0;

    drawn.forEach((card) => {
      if (winning.includes(card)) {
        if (points === 0) {
          points += 1;
        } else {
          points *= 2;
        }
      }
    });

    return acc + points;
  }, 0);

  return {
    part1: result.toString(),
    part2: '',
  };
};

export default solution;
