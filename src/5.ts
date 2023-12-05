import { Solution } from './types';

type Mapping =
  | 'seed'
  | 'soil'
  | 'fertilizer'
  | 'water'
  | 'light'
  | 'temperature'
  | 'humidity'
  | 'location';
type Almanac = Map<Mapping, Map<number, number[]>>;
const LIST: Mapping[] = [
  'seed',
  'soil',
  'fertilizer',
  'water',
  'light',
  'temperature',
  'humidity',
  'location',
];

const solution = (input: string): Solution => {
  // source destination steps
  // seed-soil-fertilizer-water-light-temperature-humidity-location
  const [seedList, ...mapList] = input.split('\n\n');
  const seeds = seedList
    .replace('seeds: ', '')
    .split(' ')
    .map((n) => parseInt(n.trim(), 10));

  const mappings = mapList.map((map) => {
    return map
      .replace(/.* map:\n/gi, '')
      .split('\n')
      .map((line) => {
        return line.split(' ').map((n) => parseInt(n.trim(), 10));
      });
  });

  const almanac: Almanac = new Map();

  mappings.forEach((list, index) => {
    const item = LIST[index];
    const map = new Map<number, number[]>();
    list.forEach(([destination, source, steps]) => {
      map.set(source, [source + steps - 1, difference(destination, source)]);
    });
    almanac.set(item, map);
  });

  let next = 0;
  const result = seeds.reduce((acc, seed) => {
    next = seed;
    LIST.forEach((item, index) => {
      const list = almanac.get(item);
      if (!list) {
        return;
      }
      // const listKeys = [...list.keys()].sort();

      let isFound = false;
      const entry = list.entries();
      let difference = 0;

      while (!isFound) {
        const nextEntry = entry.next();

        if (nextEntry.done) {
          break;
        }
        const {
          value: [start, [max, diff]],
        } = nextEntry;

        if (isBetween(start, next, max)) {
          difference = diff;
          isFound = true;
        }
      }

      next = next + difference;
    });
    if (acc === 0) {
      return next;
    }
    if (acc < next) {
      return acc;
    }

    return next;
  }, 0);

  function difference(source: number, destination: number): number {
    return source - destination;
  }

  function isBetween(start: number, number: number, end: number) {
    return number >= start && number <= end;
  }

  return {
    part1: result.toString(),
    part2: '',
  };
};

export default solution;
