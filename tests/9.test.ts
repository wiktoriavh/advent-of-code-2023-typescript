import { expect, describe, it } from 'vitest';
import solution from '../src/9';

const EXAMPLE = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const RESULT1 = '114';
const RESULT2 = '6';

describe('day 7', () => {
  it('should solve part 1', () => {
    const result = solution(EXAMPLE);
    expect(result.part1).toBe(RESULT1);
  });
  it('should solve part 2', () => {
    const result = solution(EXAMPLE);
    expect(result.part2).toBe(RESULT2);
  });
});
