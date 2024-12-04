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

const checkLevel = (a, b, prevDir) => {
  const diff = a - b;
  let isSafe = true;

  if (Math.abs(diff) > 3 || diff === 0) isSafe = false;

  const newDir = getSign(diff);

  if (prevDir && prevDir !== newDir) isSafe = false;

  return { dir: newDir, isSafe };
};

const assessReport = (report, tolerance = 0) => {
  let prevDir;
  for (let i = 1; i < report.length; i++) {
    let a = report[i - 1],
      b = report[i];

    let { dir, isSafe } = checkLevel(a, b, prevDir);

    if (!isSafe && tolerance === 0) {
      return false;
    } else if (!isSafe && tolerance > 0) {
      return (
        assessReport(report.toSpliced(i - 1, 1)) ||
        assessReport(report.toSpliced(i, 1)) ||
        assessReport(report.toSpliced(i - 2, 1))
      );
    }

    prevDir = dir;
  }

  return true;
};

export const solve1 = (input) => {
  const reports = parse(input);

  let safeCount = 0;
  for (let i = 0; i < reports.length; i++) {
    if (assessReport(reports[i])) safeCount++;
  }

  return safeCount;
};

export const solve2 = (input) => {
  const reports = parse(input);

  let safeCount = 0;
  for (let i = 0; i < reports.length; i++) {
    if (assessReport(reports[i], 1)) safeCount++;
  }

  return safeCount;
};
