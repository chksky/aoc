const regex = /mul\((\d+),(\d+)\)/g;

export const solve1 = (input) => {
  const groups = [...input.matchAll(regex)];

  let sum = groups.reduce((acc, group) => {
    return acc + Number(group[1]) * Number(group[2]);
  }, 0);

  return sum;
};

export const solve2 = (input) => {};
