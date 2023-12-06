import { Solution } from './types';

const SPEED_PER_MILLISECOND = 1;

const solution = (input: string): Solution => {
  const [time, distance] = input.split('\n').map((line) =>
    line
      .replace(/.+:\s+/gi, '')
      .trim()
      .split(/\s+/gi)
      .map((n) => parseInt(n, 10)),
  );

  return {
    part1: '',
    part2: '',
  };
};

export default solution;
