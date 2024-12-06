const parse = (input) => {
  const [r, u] = input.split(/\n\n/);
  const rules = r
    .split(/\n\n/)[0]
    .split(/\n/)
    .map((pair) => pair.split("|"));

  const updates = u
    .split(/\n/)
    .filter(Boolean)
    .map((o) => o.split(","));

  return { rules, updates };
};

const checkOrder = (allRules, update) => {
  for (let i = 1; i < update.length; i++) {
    const p = update[i];
    const rules = allRules.filter((r) => r[0] == p);

    if (!rules.length) continue;

    for (const [, next] of rules) {
      const nextInd = update.indexOf(next);
      if (nextInd !== -1 && nextInd < i) return false;
    }
  }

  return true;
};

export const solve1 = (input) => {
  const { rules, updates } = parse(input);

  let sum = 0;
  for (const update of updates) {
    if (checkOrder(rules, update)) {
      sum += Number(update[Math.floor(update.length / 2)]);
    }
  }

  return sum;
};

export const solve2 = (input) => {};
