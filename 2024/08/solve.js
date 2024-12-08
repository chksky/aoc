const parse = (input) => {
  const antenas = new Map();
  const rows = input.split(/\n/);
  const mapDimetions = [rows.length, rows[0].length];
  rows.forEach((r, i) => {
    r.split("").forEach((c, j) => {
      if (c === ".") return;
      if (antenas.has(c)) {
        antenas.get(c).push([i, j]);
      } else {
        antenas.set(c, [[i, j]]);
      }
    });
  });

  return { antenas, mapDimetions };
};

const isOnMap = (coords, mapDimetions) => {
  return (
    coords[0] >= 0 &&
    coords[0] < mapDimetions[0] &&
    coords[1] >= 0 &&
    coords[1] < mapDimetions[1]
  );
};

const getRelation = (a, b) => {
  let r, c;
  if (a[0] > b[0]) r = -1;
  else if (a[0] < b[0]) r = 1;
  else r = 0;

  if (a[1] > b[1]) c = -1;
  else if (a[1] < b[1]) c = 1;
  else c = 0;

  return [r, c];
};

const getAntinodes = (a, b) => {
  const antinodeOffset = [Math.abs(a[0] - b[0]), Math.abs(b[1] - a[1])];
  const relation = getRelation(a, b);

  const left = [
    a[0] - relation[0] * antinodeOffset[0],
    a[1] - relation[1] * antinodeOffset[1],
  ];

  const right = [
    b[0] + relation[0] * antinodeOffset[0],
    b[1] + relation[1] * antinodeOffset[1],
  ];

  return [left, right];
};

const getLeftAntinode = (a, b, multiplier) => {
  const antinodeOffset = [Math.abs(a[0] - b[0]), Math.abs(b[1] - a[1])];
  const relation = getRelation(a, b);

  return [
    a[0] - relation[0] * antinodeOffset[0] * multiplier,
    a[1] - relation[1] * antinodeOffset[1] * multiplier,
  ];
};

const getRightAntinode = (a, b, multiplier) => {
  const antinodeOffset = [Math.abs(a[0] - b[0]), Math.abs(b[1] - a[1])];
  const relation = getRelation(a, b);

  return [
    b[0] + relation[0] * antinodeOffset[0] * multiplier,
    b[1] + relation[1] * antinodeOffset[1] * multiplier,
  ];
};

const countAntinodes = (antenas, mapDimetions) => {
  const antinodes = new Set();

  for (const [_, locations] of antenas) {
    for (let i = 0; i < locations.length; i++) {
      const a = locations[i];
      for (let j = i + 1; j < locations.length; j++) {
        const b = locations[j];

        getAntinodes(a, b).forEach((antinodeLocation) => {
          if (isOnMap(antinodeLocation, mapDimetions))
            antinodes.add(antinodeLocation.join(","));
        });
      }
    }
  }

  return antinodes.size;
};

const countAntinodes2 = (antenas, mapDimetions) => {
  const antinodes = new Set();

  for (const [_, locations] of antenas) {
    for (let i = 0; i < locations.length; i++) {
      const a = locations[i];
      for (let j = i + 1; j < locations.length; j++) {
        const b = locations[j];

        antinodes.add(a.join(","));
        antinodes.add(b.join(","));

        let mul = 1;
        while (isOnMap(getLeftAntinode(a, b, mul), mapDimetions)) {
          antinodes.add(getLeftAntinode(a, b, mul).join(","));
          mul++;
        }

        mul = 1;
        while (isOnMap(getRightAntinode(a, b, mul), mapDimetions)) {
          antinodes.add(getRightAntinode(a, b, mul).join(","));
          mul++;
        }
      }
    }
  }

  return antinodes.size;
};

export const solve1 = (input) => {
  const { antenas, mapDimetions } = parse(input);

  let sum = countAntinodes(antenas, mapDimetions);

  return sum;
};

export const solve2 = (input) => {
  const { antenas, mapDimetions } = parse(input);

  let sum = countAntinodes2(antenas, mapDimetions);

  return sum;
};
