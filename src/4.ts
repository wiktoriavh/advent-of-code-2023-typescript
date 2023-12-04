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

  const wonCards = new Map<number, number>();

  const result = lines.reduce(
    (acc, [winning, drawn], index) => {
      let points = 0;
      let amount = 0;
      let cardNumber = index + 1;

      drawn.forEach((card) => {
        if (winning.includes(card)) {
          amount += 1;
          if (points === 0) {
            points += 1;
          } else {
            points *= 2;
          }
        }
      });

      const repeats = wonCards.get(cardNumber) || 0;
      let result = 0;

      for (let i = 1; i <= repeats + 1; i += 1) {
        for (let i = 1; i <= amount; i += 1) {
          if (wonCards.has(cardNumber + i)) {
            wonCards.set(cardNumber + i, wonCards.get(cardNumber + i)! + 1);
          } else {
            wonCards.set(cardNumber + i, 1);
          }
        }
        result++;
      }

      return {
        part1: acc.part1 + points,
        part2: acc.part2 + result,
      };
    },
    { part1: 0, part2: 0 },
  );

  return {
    part1: result.part1.toString(),
    part2: result.part2.toString(),
  };
};

export default solution;
