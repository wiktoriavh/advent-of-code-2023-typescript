import { Solution } from './types';

const solution = (input: string): Solution => {
  const [time, distance] = input.split('\n').map((line) =>
    line
      .replace(/.+:\s+/gi, '')
      .trim()
      .split(/\s+/gi)
      .map((n) => parseInt(n, 10)),
  );

  const result: number[] = [];
  time.forEach((t, index) => {
    let speed = 0;
    const d = distance[index];
    let amountOfTime = 0;
    for (let i = 1; i < t; i++) {
      speed++;
      const remainingTime = t - i;
      const distanceMade = speed * remainingTime;
      if (distanceMade > d) {
        amountOfTime++;
      }
    }
    result.push(amountOfTime);
  });

  console.log(result);

  return {
    part1: result.reduce((a, b) => a * b, 1).toString(),
    part2: '',
  };
};

export default solution;
