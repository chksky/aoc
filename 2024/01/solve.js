const parse = (input) => {
  return input
    .split(/\n/)
    .filter((p) => p)
    .map((p) => p.split(/\s+/).map(Number));
};

export const solve1 = (input) => {
  const pairs = parse(input);
  const left = pairs.map((p) => p[0]).sort();
  const right = pairs.map((p) => p[1]).sort();

  let answer = 0;
  for (let i = 0; i < left.length; i++) {
    answer += Math.abs(left[i] - right[i]);
  }

  return answer;
};

export const solve2 = (input) => {
  const pairs = parse(input);
  const left = pairs.map((p) => p[0]).sort();
  const right = pairs.map((p) => p[1]).sort();

  let answer = 0;

  const similar = new Map();
  let r = right.shift();
  for (let i = 0; i < left.length; i++) {
    const l = left[i];

    while (r <= l) {
      if (r === l) {
        if (!similar.has(l)) {
          similar.set(l, 1);
        } else {
          similar.set(l, similar.get(l) + 1);
        }
      }
      r = right.shift();
    }

    answer += l * similar.get(l) || 0;
  }

  return answer;
};
