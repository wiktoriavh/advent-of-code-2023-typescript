import { type } from 'os';
import { Solution } from './types';

const POSSIBLE: Turn = {
  red: 12,
  green: 13,
  blue: 14,
};

type Turn = {
  red?: number;
  green?: number;
  blue?: number;
};

type TurnKey = keyof Turn;

type Round = Turn[];
type Game = Round[];

const solution = (input: string): Solution => {
  const games = input.split('\n').map((line) => {
    return line.replace(/Game \d+:\s/gi, '');
  });

  const grouped = games.reduce((acc, curr) => {
    const rounds = curr.split(';');
    const game: Round = [];
    rounds.forEach((round) => {
      const play = round.split(',');
      const turnObj: Turn = {};
      play.forEach((turn) => {
        const [count, color] = turn.trim().split(' ');
        turnObj[color as TurnKey] = Number(count) as number;
      });
      game.push(turnObj);
    });
    return [...acc, game];
  }, [] as Game);

  const points = grouped.map((round, index) => {
    const isRoundValid = round.every((turn) => {
      const colors = Object.keys(turn);
      const isCountValid = colors.every((color) => {
        const count = turn[color as TurnKey]!;
        return count <= POSSIBLE[color as TurnKey]!;
      });
      return isCountValid;
    })
    return isRoundValid ? index + 1 : 0;
  });

  return {
    part1: points.reduce((acc, curr) => acc + curr, 0).toString(),
    part2: '',
  };
};

export default solution;
