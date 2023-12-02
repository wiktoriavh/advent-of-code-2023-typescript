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

  const fullGame = games.reduce((acc, curr) => {
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

  const points = fullGame.map((round, index) => {
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

  const minimum = fullGame.map((round) => {
    const minColors: Turn = {};
    round.forEach((turn) => {
      const colors = Object.keys(turn);
      colors.forEach((color) => {
        const count = turn[color as TurnKey]!;
        if (minColors[color as TurnKey] === undefined) {
          minColors[color as TurnKey] = count;
        } else {
          minColors[color as TurnKey] = Math.max(minColors[color as TurnKey]!, count);
        }
      });
    });
    return minColors;
  });

  

  return {
    part1: points.reduce((acc, curr) => acc + curr, 0).toString(),
    part2: minimum.reduce((acc, curr) => {
      const colors = Object.keys(curr);
      const total = colors.reduce((acc, currColor) => acc * curr[currColor as TurnKey]!, 1);
      return acc + total;
    }, 0).toString(),
  };
};

export default solution;
