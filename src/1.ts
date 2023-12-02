import { Solution } from './types';

type NumberWord =
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine';
type NumberStrings = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

const numberMap = new Map<NumberWord, NumberStrings>([
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9'],
]);

const isNumber = (str: string) => {
  return !isNaN(Number(str));
};

const convert = (numberWord: NumberWord | NumberStrings): NumberStrings => {
  const maybeNumber = Number(numberWord);
  if (!Number.isNaN(maybeNumber)) return numberWord as NumberStrings;
  return numberMap.get(numberWord as NumberWord)!;
};

const regexFirst = /(one|two|three|four|five|six|seven|eight|nine|\d)/i;
const regexLast = /.*(one|two|three|four|five|six|seven|eight|nine|\d)/i;

const solution = (input: string): Solution => {
  const lines = input.split('\n');

  const nums: number[] = [];
  lines.forEach((line) => {
    let left = 0;
    let right = line.length - 1;
    const num = {
      left: '',
      right: '',
      get concat() {
        return this.left + this.right;
      },
    };
    while (num.concat.length !== 2) {
      const posLeft = line[left];
      const posRight = line[right];

      if (isNumber(posLeft)) {
        num.left = posLeft;
      } else {
        left++;
      }
      if (isNumber(posRight)) {
        num.right = posRight;
      } else {
        right--;
      }
    }
    nums.push(Number(num.concat));
  });

  const nums2: number[] = [];
  lines.forEach((line) => {
    const first = line.match(regexFirst);
    const last = line.match(regexLast);
    if (!first || !last) {
      console.log('no match');
      return;
    }
    nums2.push(
      Number(
        convert(first[1] as NumberWord | NumberStrings) +
          convert(last[1] as NumberWord | NumberStrings),
      ),
    );
  });
  return {
    part1: String(nums.reduce((a, b) => a + b, 0)),
    part2: String(nums2.reduce((a, b) => a + b, 0)),
  };
};

export default solution;
