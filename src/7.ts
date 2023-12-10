import { Solution } from './types';

type CardType =
  | 'A'
  | 'K'
  | 'Q'
  | 'J'
  | 'T'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2';

const DeckMap = new Map<CardType, number>([
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['T', 10],
  ['J', 11],
  ['Q', 12],
  ['K', 13],
  ['A', 14],
]);

const Types = new Map([
  ['5', 7], // Five of a kind
  ['14', 6], // Four of a kind
  ['23', 5], // Full house
  ['113', 4], // Three of a kind
  ['122', 3], // Two pair
  ['1112', 2], // One pair
  ['11111', 1], // High card
]);

const solution = (input: string): Solution => {
  const pairs = input.split('\n').map((pair) => pair.split(' '));

  function convertToPoints(card: CardType): number {
    return DeckMap.get(card)!;
  }

  function getType(hand: string): number {
    let prev: string = '';
    const cards = hand.split('').sort();

    const dict: number[] = [];

    cards.forEach((card) => {
      if (card !== prev) {
        dict.push(1);
      } else {
        dict[dict.length - 1] = dict[dict.length - 1] + 1;
      }
      prev = card;
    });

    return Types.get(dict.sort((a, b) => a - b).join(''))!;
  }

  const sortedHands = new Map<number, string[][]>();

  pairs.forEach((pair) => {
    const type = getType(pair[0]);
    if (sortedHands.has(type)) {
      sortedHands.set(type, [...sortedHands.get(type)!, pair]);
    } else {
      sortedHands.set(type, [pair]);
    }
  });

  const keys = [...sortedHands.keys()].sort((a, b) => b - a);
  let rank = pairs.length;
  let points = 0;

  keys.forEach((key) => {
    const hands = sortedHands.get(key)!;
    if (hands.length === 1) {
      const bid = hands[0][1];
      points += Number(bid) * rank;
      rank--;
    } else {
      const sorted = hands.sort((a, b) => {
        const hand1 = a[0]
          .split('')
          .map((card) => convertToPoints(card as CardType));
        const hand2 = b[0]
          .split('')
          .map((card) => convertToPoints(card as CardType));

        for (let i = 0; i < 5; i++) {
          if (hand1[i] !== hand2[i]) {
            return hand2[i] - hand1[i];
          }
        }
        return 1;
      });
      sorted.forEach(([_hand, bid]) => {
        points += Number(bid) * rank;
        rank--;
      });
    }
  });

  return {
    part1: points.toString(),
    part2: '',
  };
};

export default solution;
