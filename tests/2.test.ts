import { describe, it, expect } from 'vitest';
import solution from '../src/2.ts';

const EXAMPLE1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
const RESULT1 = '8';
const RESULT2 = '2286';

describe('day 2', () => {
  it('should solve part 1', () => {
    const result = solution(EXAMPLE1);
    expect(result.part1).toBe(RESULT1);
  });
  it('should solve part 2', () => {
    const result = solution(EXAMPLE1);
    expect(result.part2).toBe(RESULT2);
  });
});
