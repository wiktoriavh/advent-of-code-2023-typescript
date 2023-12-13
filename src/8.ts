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

  let steps = 0;
  let nodeName = 'AAA';

  while (nodeName !== 'ZZZ') {
    const directionIndex = steps % directions.length;
    const node = nodes.get(nodeName)!;
    nodeName = node[directions[directionIndex]];
    steps++;
  }

  console.log({ steps });

  const part1 = steps.toString();
  const part2 = '';
  return { part1, part2 };
};

export default solution;
