import { Solution } from "./types";

const isNumber = (str: string) => {
  return !isNaN(Number(str));
}

const regex = /one|two|three|four|five|six|seven|eight|nine|\d/gi

 const solution = (input: string): Solution => {
  const lines = input.split("\n")
  const nums: number[] = []
  lines.forEach(line => {
    let left = 0;
    let right = line.length - 1;
    const num = {
      left: "",
      right: "",
      get concat() {
        return this.left + this.right
      }
    }
    while (num.concat.length !== 2) {
      const posLeft = line[left]
      const posRight = line[right]
      
      if (isNumber(posLeft)) {
        num.left = posLeft
      } else {
        left++
      }
      if (isNumber(posRight)) {
        num.right = posRight
      } else {
        right--
      }
    }
    nums.push(Number(num.concat))
  });

  return {
    part1: String(nums.reduce((a, b) => a + b, 0)),
    part2: ""
  }
}


export default solution;