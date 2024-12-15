const parse = (input) => {
  return input.split(' ').map(Number);
};

const makeNewStone = (stone) => {
  if (stone === 0) {
    return [1];
  } else if (String(stone).length % 2 === 0) {
    const str = String(stone);
    return [
      str.substring(0, str.length / 2),
      str.substring(str.length / 2),
    ].map(Number);
  } else {
    return [stone * 2024];
  }
};

const blink = (numbers) => {
  const res = [];

  for (const number of numbers) {
    res.push(...makeNewStone(number));
  }

  return res;
};

export const solve1 = (input) => {
  let numbers = parse(input);

  for (let i = 0; i < 25; i++) {
    numbers = blink(numbers);
  }

  return numbers.length;
};

const sum = (arr) => arr.reduce((acc, i) => acc + i, 0);

function memo(fn) {
  const cache = new Map();

  const memoizedFn = (...arg) => {
    const key = arg.join(',');
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...arg);
    cache.set(key, result);

    return result;
  };

  return memoizedFn;
}

const countStoneNumbers = memo((stone, blinksLeft) => {
  if (blinksLeft === 0) return 1;

  const newStones = makeNewStone(stone);

  return sum(newStones.map((s) => countStoneNumbers(s, blinksLeft - 1)));
});

export const solve2 = (input) => {
  let numbers = parse(input);

  let count = 0;
  for (const number of numbers) {
    count += countStoneNumbers(number, 75);
  }

  return count;
};
