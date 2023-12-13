import { Solution } from './types';

type Node = [string, string];

const solution = (input: string): Solution => {
  const [rawDirections, rawNodes] = input.split('\n\n');
  const directions = rawDirections
    .replaceAll('L', '0')
    .replaceAll('R', '1')
    .split('')
    .map(Number);
  const nodes = new Map<string, Node>();
  rawNodes.split('\n').forEach((line) => {
    const [start, rawDestinations] = line.split(' = ');
    const destinations = rawDestinations
      .replaceAll('(', '')
      .replaceAll(')', '')
      .split(', ');

    nodes.set(start, destinations as Node);
  });

  function getStepsPart1() {
    let steps = 0;
    let nodeName = 'AAA';

    while (nodeName !== 'ZZZ') {
      const directionIndex = steps % directions.length;
      const node = nodes.get(nodeName)!;
      nodeName = node[directions[directionIndex]];
      steps++;
    }

    return steps;
  }

  function getStepsPart2() {
    const gcd = (a: number, b: number): number => {
      if (b === 0) {
        return a;
      }
      return gcd(b, a % b);
    };

    const lcm = (a: number, b: number): number => {
      return (a * b) / gcd(a, b);
    };

    const startingNodes = [...nodes.keys()].filter((key) => key.endsWith('A'));

    const stepsPerNode = new Map<string, number>();

    startingNodes.forEach((nodeName) => {
      let steps = 0;
      while (!nodeName.endsWith('Z')) {
        const directionIndex = steps % directions.length;
        const node = nodes.get(nodeName)!;
        nodeName = node[directions[directionIndex]];
        steps++;
      }
      stepsPerNode.set(nodeName, steps);
    });

    return [...stepsPerNode.values()].reduce(lcm);
  }

  const part1 = getStepsPart1().toString();
  const part2 = getStepsPart2().toString();
  return { part1, part2 };
};

export default solution;
