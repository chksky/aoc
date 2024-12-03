const parse = (input) => {
  return input
    .split(/\n/)
    .filter((p) => p)
    .map((p) => p.split(/\s+/).map(Number));
};

const getSign = (a) => {
  if (a > 0) return 1;
  else if (a < 0) return -1;
  else return 0;
};

const assessLevel = (arr) => {
  let dir;
  for (let i = 1; i < arr.length; i++) {
    let a = arr[i - 1],
      b = arr[i];
    const diff = a - b;

    if (Math.abs(diff) > 3 || diff === 0) return false;

    let newDir = getSign(diff);

    if (dir && newDir !== dir) return false;

    dir = newDir;
  }

  return true;
};

export const solve1 = (input) => {
  const levels = parse(input);

  let safeCount = 0;
  for (let i = 0; i < levels.length; i++) {
    if (assessLevel(levels[i])) safeCount++;
  }

  return safeCount;
};

export const solve2 = (input) => {};
