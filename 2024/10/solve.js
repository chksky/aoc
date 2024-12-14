const parse = (input) => {
  return input.split(/\n/).map((r) => r.split('').map(Number))
}

const offsets = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
]

const isOnMap = (pos, map) =>
  pos[0] < map.length &&
  pos[0] >= 0 &&
  pos[1] < map[pos[0]].length &&
  pos[1] >= 0

const getTrails = (pos, map, acc) => {
  const currentAlt = map[pos[0]][pos[1]]

  if (currentAlt === 9) {
    acc.add(pos.join(','))
    return acc
  }

  const nextAlt = currentAlt + 1
  for (const offset of offsets) {
    const moveTo = [pos[0] + offset[0], pos[1] + offset[1]]
    if (!isOnMap(moveTo, map)) continue

    const offsetAlt = map[moveTo[0]][moveTo[1]]
    if (offsetAlt === nextAlt) {
      getTrails(moveTo, map, acc)
    }
  }

  return acc
}

export const solve1 = (input) => {
  const map = parse(input)

  let total = 0
  for (let i = 0; i < map.length; i++) {
    const row = map[i]
    for (let j = 0; j < row.length; j++) {
      if (map[i][j] !== 0) continue
      total += getTrails([i, j], map, new Set()).size
    }
  }

  return total
}

const getRating = (pos, map) => {
  let rating = 0
  const currentAlt = map[pos[0]][pos[1]]

  if (currentAlt === 9) return 1

  const nextAlt = currentAlt + 1
  for (const offset of offsets) {
    const moveTo = [pos[0] + offset[0], pos[1] + offset[1]]
    if (!isOnMap(moveTo, map)) continue

    const offsetAlt = map[moveTo[0]][moveTo[1]]
    if (offsetAlt === nextAlt) rating += getRating(moveTo, map)
  }

  return rating
}

export const solve2 = (input) => {
  const map = parse(input)

  let total = 0
  for (let i = 0; i < map.length; i++) {
    const row = map[i]
    for (let j = 0; j < row.length; j++) {
      if (map[i][j] !== 0) continue
      total += getRating([i, j], map)
    }
  }

  return total
}
