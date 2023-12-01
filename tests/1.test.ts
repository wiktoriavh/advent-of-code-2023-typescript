import { describe, it, expect } from "vitest"

import solution from "../src/1.ts"

const EXAMPLE = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`
const RESULT1 = "142"
const EXAMPLE2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
const RESULT2 = "281"

describe("day 1", () => {
  it("should solve part 1", () => {
    const result = solution(EXAMPLE)
    expect(result.part1).toBe(RESULT1)
  })
  it("should solve part 2", () => {
    const result = solution(EXAMPLE2)
    expect(result.part2).toBe(RESULT2)
  })
})