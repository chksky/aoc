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

const fixOrder = (allRules, update) => {
  return update.toSorted((a, b) => {
    const rule = allRules.filter(
      (r) => (r[0] == a && r[1] == b) || (r[0] == b && r[1] == a),
    )[0];

    if (rule[0] == a && rule[1] == b) return 1;
    if (rule[1] == a && rule[0] == b) return -1;
  });
};

export const solve2 = (input) => {
  const { rules, updates } = parse(input);

  let sum = 0;
  for (const update of updates) {
    if (!checkOrder(rules, update)) {
      const fixed = fixOrder(rules, update);
      sum += Number(fixed[Math.floor(update.length / 2)]);
    }
  }

  return sum;
};
