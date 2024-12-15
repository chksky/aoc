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

export const solve2 = (input) => {};
