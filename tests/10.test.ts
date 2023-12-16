import { expect, describe, it } from 'vitest';
import solution from '../src/10';

const EXAMPLE = `.....
.F-7.
.|.|.
.L-J.
.....`;

const RESULT1 = '114';
const RESULT2 = '6';

describe('day 10', () => {
  it('should solve part 1', () => {
    const result = solution(EXAMPLE);
    expect(result.part1).toBe(RESULT1);
  });
  it('should solve part 2', () => {
    const result = solution(EXAMPLE);
    expect(result.part2).toBe(RESULT2);
  });
});
