const DIR = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

const parse = (input) => {
  let guard;
  const lab = input.split(/\n/).map((r, i) => {
    const row = r.split("");
    const g = r.match(/>|<|\^|v/);
    if (g) {
      guard = {
        dir: g[0],
        pos: [i, r.indexOf(g[0])],
      };
    }
    return row;
  });

  return { lab, guard };
};

const rotateDir = (dir) => {
  if (dir == "<") return "^";

  const dirs = Object.keys(DIR);
  return dirs[dirs.indexOf(dir) + 1];
};

const navigate = (guard, lab) => {
  const visited = new Set();

  const getAtPos = (pos) => lab[pos[0]][pos[1]];

  let { dir, pos } = guard;
  visited.add(`${pos[0]},${pos[1]}`);
  while (true) {
    const row = lab[pos[0]];

    const move = DIR[dir];
    const newRow = pos[0] + move[0];
    const newCol = pos[1] + move[1];

    if (
      newCol >= row.lenght ||
      newCol < 0 ||
      newRow >= lab.length ||
      newRow < 0
    ) {
      return visited.size;
    }

    if (getAtPos([newRow, newCol]) == "#") {
      dir = rotateDir(dir);
    } else {
      visited.add(`${newRow},${newCol}`);
      pos = [newRow, newCol];
    }
  }
};

export const solve1 = (input) => {
  const { lab, guard } = parse(input);

  return navigate(guard, lab);
};

export const solve2 = (input) => {};
