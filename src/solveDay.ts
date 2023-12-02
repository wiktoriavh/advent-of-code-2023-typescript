import { Solution } from './types';

const inputPath = './inputs/{{day}}.txt';
const solutionPath = './{{day}}.ts';

export async function solveDay(day: number): Promise<Solution> {
  try {
    const input = await Bun.file(
      inputPath.replace('{{day}}', String(day)),
    ).text();
    const dayFunction = await import(
      solutionPath.replace('{{day}}', String(day))
    );
    const result = await dayFunction.default(input);
    console.log(result);
    return result as Solution;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const result = await solveDay(2);
console.log(result);
