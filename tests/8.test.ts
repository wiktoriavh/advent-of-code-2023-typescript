import { expect, describe, it } from 'vitest';
import solution from '../src/8';

const EXAMPLE = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;
const RESULT1 = '2';
const RESULT2 = '';

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
