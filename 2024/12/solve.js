const parse = (input) => {
  return input.split(/\n/).map((r) => r.split(''));
};

const moves = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const isOnMap = (pos, map) =>
  pos[0] >= 0 &&
  pos[1] >= 0 &&
  pos[0] < map.length &&
  pos[1] < map[pos[0]].length;

const getAtPos = (pos, garden) => garden[pos[0]][pos[1]];

const inRegion = (p, region) =>
  Boolean(region.find((fp) => fp[0] === p[0] && fp[1] === p[1]));

const fill = (pos, garden) => {
  const fence = [pos];
  const plant = getAtPos(pos, garden);

  for (let i = 0; i < fence.length; i++) {
    const p = fence[i];
    const neighbors = moves
      .map((m) => [p[0] + m[0], p[1] + m[1]])
      .filter((m) => isOnMap(m, garden));

    for (const n of neighbors) {
      if (getAtPos(n, garden) === plant && !inRegion(n, fence)) fence.push(n);
    }
  }

  return fence;
};

const calcPrice = (region) => {
  const area = region.length;

  let perimeter = 0;
  for (let i = 0; i < region.length; i++) {
    const p = region[i];
    const neighbors = moves
      .map((m) => [p[0] + m[0], p[1] + m[1]])
      .filter((n) => !inRegion(n, region));
    perimeter += neighbors.length;
  }

  return area * perimeter;
};

export const solve1 = (input) => {
  const garden = parse(input);

  const checked = new Set();
  const regions = [];

  let totalPrice = 0;
  for (let i = 0; i < garden.length; i++) {
    const row = garden[i];
    for (let j = 0; j < row.length; j++) {
      const key = `${i},${j}`;
      if (checked.has(key)) continue;
      const region = fill([i, j], garden);

      region.forEach((p) => checked.add(p.join(',')));
      totalPrice += calcPrice(region);
    }
  }

  return totalPrice;
};

export const solve2 = (input) => {};
