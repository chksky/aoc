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

const makeMove = (pos, dir) => {
  const move = DIR[dir];
  const newRow = pos[0] + move[0];
  const newCol = pos[1] + move[1];

  return [newRow, newCol];
};

let looped = [];

const isOut = (pos, lab) =>
  pos[1] >= lab[0].length || pos[1] < 0 || pos[0] >= lab.length || pos[0] < 0;

const navigate = (guard, lab) => {
  const visited = new Set();

  const getAtPos = (pos) => lab[pos[0]][pos[1]];

  let { dir, pos } = guard;
  visited.add(`${pos[0]},${pos[1]}`);
  while (true) {
    const newPos = makeMove(pos, dir);

    if (isOut(newPos, lab)) {
      return visited.size;
    }

    if (getAtPos(newPos) == "#") {
      dir = rotateDir(dir);
    } else {
      visited.add(newPos.join(","));
      pos = newPos;
    }
  }
};

export const solve1 = (input) => {
  const { lab, guard } = parse(input);

  return navigate(guard, lab);
};

const isLooped = (guard, lab, obsPos) => {
  const getAtPos = (pos) =>
    pos[0] === obsPos[0] && pos[1] === obsPos[1] ? "#" : lab[pos[0]][pos[1]];

  const genPosKey = (pos, dir) => `${pos.join(",")}${dir}`;

  let { dir, pos } = guard;
  let visited = new Set();
  while (true) {
    const posKey = genPosKey(pos, dir);
    if (visited.has(posKey)) {
      looped.push(obsPos);
      return true;
    }

    visited.add(posKey);
    const newPos = makeMove(pos, dir);

    if (isOut(newPos, lab)) return false;

    if (getAtPos(newPos) === "#") {
      dir = rotateDir(dir);
    } else {
      pos = newPos;
    }
  }
};

const findLoops = (guard, lab) => {
  const getAtPos = (pos) => lab[pos[0]][pos[1]];

  let { dir, pos } = guard;
  const obstructions = new Set();
  const visited = new Set();
  while (true) {
    visited.add(pos.join(","));
    const newPos = makeMove(pos, dir);

    if (isOut(newPos, lab)) {
      return obstructions.size;
    }

    if (getAtPos(newPos) === "#") {
      dir = rotateDir(dir);
    } else {
      if (!visited.has(newPos.join(","))) {
        const looped = isLooped({ dir, pos }, lab, newPos);
        if (looped) {
          obstructions.add(newPos.join(","));
        }
      }

      pos = newPos;
    }
  }
};

export const solve2 = (input) => {
  const { lab, guard } = parse(input);

  const loopsCount = findLoops(guard, lab);

  return loopsCount;
};
