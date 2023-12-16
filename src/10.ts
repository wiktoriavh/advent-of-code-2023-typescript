import { Solution } from './types';

const solution = (input: string): Solution => {
  let start = [0, 0];
  const labyrinth = input.split('\n').map((line, row) =>
    line.split('').map((tile, col) => {
      const rowUp = row - 1;
      const rowDown = row + 1;
      const colLeft = col - 1;
      const colRight = col + 1;

      switch (tile) {
        case '|':
          return {
            tile,
            up: [rowUp, col],
            down: [rowDown, col],
            left: null,
            right: null,
            possibleDirections: ['up', 'down'],
          };
        case '-':
          return {
            tile,
            up: null,
            down: null,
            left: [row, colLeft],
            right: [row, colRight],
            possibleDirections: ['left', 'right'],
          };
        case 'L':
          return {
            tile,
            up: [rowUp, col],
            down: null,
            left: null,
            right: [row, colRight],
            possibleDirections: ['up', 'right'],
          };
        case 'J':
          return {
            tile,
            up: [rowUp, col],
            down: null,
            left: [row, colLeft],
            right: null,
            possibleDirections: ['up', 'left'],
          };
        case '7':
          return {
            tile,
            up: null,
            down: [rowDown, col],
            left: [row, colLeft],
            right: null,
            possibleDirections: ['down', 'left'],
          };
        case 'F':
          return {
            tile,
            up: null,
            down: [rowDown, col],
            left: null,
            right: [row, colRight],
            possibleDirections: ['down', 'right'],
          };
        case '.':
          return {
            tile,
            up: null,
            down: null,
            left: null,
            right: null,
            possibleDirections: [],
          };
        case 'S':
          start = [row, col];
          return {
            tile,
            up: [rowUp, col],
            down: [rowDown, col],
            left: [row, colLeft],
            right: [row, colRight],
          };
        default:
          throw new Error(`Unexpected tile ${tile}`);
      }
    }),
  );

  const coords = {
    alpha: { coord: [0, 0], from: '' },
    omega: { coord: [0, 0], from: '' },
  };

  const possibleDirections = ['up', 'down', 'left', 'right'] as const;
  const oppositeDirections = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
  };

  let amount = 0;

  for (let i = 0; i < 4; i++) {
    const position = possibleDirections[i];
    const next = labyrinth[start[0]][start[1]][position]!;
    const pipe = labyrinth[next[0]][next[1]];

    if (pipe[oppositeDirections[position]] !== null) {
      if (amount === 0) {
        coords.alpha.coord = next;
        coords.alpha.from = oppositeDirections[position];
        amount++;
      }

      coords.omega.coord = next;
      coords.omega.from = oppositeDirections[position];
    }
  }

  let steps = 1;

  while (
    coords.alpha.coord[0] !== coords.omega.coord[0] ||
    coords.alpha.coord[1] !== coords.omega.coord[1]
  ) {
    const alpha = labyrinth[coords.alpha.coord[0]][coords.alpha.coord[1]];
    const alphaNext = alpha.possibleDirections?.filter(
      (dir) => dir !== coords.alpha.from,
    )[0]!;
    const omega = labyrinth[coords.omega.coord[0]][coords.omega.coord[1]];
    const omegaNext = omega.possibleDirections?.filter(
      (dir) => dir !== coords.omega.from,
    )[0]!;

    coords.alpha.coord = alpha[alphaNext]!;
    coords.alpha.from = oppositeDirections[alphaNext];
    coords.omega.coord = omega[omegaNext]!;
    coords.omega.from = oppositeDirections[omegaNext];

    steps++;
  }

  return { part1: steps.toString(), part2: '' };
};

export default solution;
