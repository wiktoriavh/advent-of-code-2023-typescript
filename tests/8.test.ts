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
const EXAMPLE2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const RESULT1 = '2';
const RESULT2 = '6';

describe('day 8', () => {
  it('should solve part 1', () => {
    const result = solution(EXAMPLE);
    expect(result.part1).toBe(RESULT1);
  });
  it('should solve part 2', () => {
    const result = solution(EXAMPLE2);
    expect(result.part2).toBe(RESULT2);
  });
});
