const mulRegex = /mul\((\d+),(\d+)\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don\'t\(\)/g;

export const solve1 = (input) => {
  const groups = [...input.matchAll(mulRegex)];

  let sum = groups.reduce((acc, group) => {
    return acc + Number(group[1]) * Number(group[2]);
  }, 0);

  return sum;
};

export const solve2 = (input) => {
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)/g;
  const groups = [...input.matchAll(regex)];

  let sum = 0,
    prevIns;
  for (let i = 0; i < groups.length; i++) {
    const currentIns = groups[i];

    if (currentIns[0].startsWith("do")) {
      prevIns = currentIns;
      continue;
    }

    if (
      currentIns[0].startsWith("mul") &&
      (!prevIns || prevIns[0].startsWith("do("))
    ) {
      sum += Number(currentIns[1]) * currentIns[2];
      prevIns = null;
    }
  }

  return sum;
};
