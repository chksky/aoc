const parse = (input) => {
  return input
    .split(/\n/)
    .filter(Boolean)
    .map((r) => r.split(""));
};

const genVariants = () => {
  const str = "XMAS";
  const dir = str.split("");
  const reverse = str.split("").reverse();

  const row = (c, i) => {
    const r = [];
    r[i] = c;
    return r;
  };

  const matches = [
    [[...dir]],
    [[...reverse]],
    [...dir.map((c) => [c])],
    [...reverse.map((c) => [c])],
    [...dir.map(row)],
    [...reverse.map(row)],
    [...dir.map((c, i) => row(c, dir.length - i - 1))],
    [...reverse.map((c, i) => row(c, dir.length - i - 1))],
  ];

  return matches;
};

const matchSubMatrix = (matrix, submatrix, [row, column]) => {
  if (row + submatrix.length > matrix.length) return;

  for (let i = 0; i < submatrix.length; i++) {
    const tr = matrix[row + i];
    if (!tr) return;
    const r = submatrix[i];

    for (let j = 0; j < r.length; j++) {
      const cell = r[j];
      if (!cell) continue;

      const tcell = matrix[row + i][column + j];
      if (!tcell) return;

      if (tcell !== cell) return;
    }
  }

  return true;
};

export const solve1 = (input) => {
  const m = parse(input);

  const variants = genVariants();

  let matchesCount = 0;
  for (let i = 0; i < m.length; i++) {
    const r = m[i];
    for (let j = 0; j < r.length; j++) {
      for (const variant of variants) {
        if (matchSubMatrix(m, variant, [i, j])) matchesCount++;
      }
    }
  }

  return matchesCount;
};

export const solve2 = (input) => {};
