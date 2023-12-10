import { expect, describe, it } from 'vitest';
import solution from '../src/5';

const EXAMPLE = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
const RESULT1 = '6440';
const RESULT2 = '71503';

describe('day 7', () => {
  it('should solve part 1', () => {
    const result = solution(EXAMPLE);
    expect(result.part1).toBe(RESULT1);
  });
  it.skip('should solve part 2', () => {
    const result = solution(EXAMPLE);
    expect(result.part2).toBe(RESULT2);
  });
});
