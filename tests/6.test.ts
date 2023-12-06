import { expect, describe, it } from 'vitest';
import solution from '../src/5';

const EXAMPLE = `Time:      7  15   30
Distance:  9  40  200`;
const RESULT1 = '288';
const RESULT2 = '';

describe('day 6', () => {
  it('should solve part 1', () => {
    const result = solution(EXAMPLE);
    expect(result.part1).toBe(RESULT1);
  });
  it.skip('should solve part 2', () => {
    const result = solution(EXAMPLE);
    expect(result.part2).toBe(RESULT2);
  });
});
