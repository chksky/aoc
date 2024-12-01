export const solve = (text) => {
  const pairs = text
    .split(/\n/)
    .filter((p) => p)
    .map((p) => p.split(/\s+/).map(Number));

  const left = pairs.map((p) => p[0]).sort();
  const right = pairs.map((p) => p[1]).sort();

  let answer = 0;
  for (let i = 0; i < left.length; i++) {
    answer += Math.abs(left[i] - right[i]);
  }

  return answer;
};
