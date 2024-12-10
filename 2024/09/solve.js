const parse = (input) => input.split('').map(Number)

const genBlocks = (map) => {
  const blocks = []
  for (let i = 0; i < map.length; i++) {
    let blockValue = i % 2 === 0 ? i / 2 : '.'
    blocks.push(...Array(map[i]).fill(blockValue))
  }

  return blocks
}

const compact = (blocks) => {
  let i = blocks.length,
    acc = 0

  while (i > acc) {
    i--
    const block = blocks[i]
    if (block === '.') continue

    acc = blocks.findIndex((b) => b === '.')
    if (i <= acc) break

    blocks[acc] = blocks[i]
    blocks[i] = '.'
  }

  return blocks
}

export const solve1 = (input) => {
  const map = parse(input)

  const blocks = compact(genBlocks(map))

  const res = blocks
    .filter((v) => !isNaN(v))
    .reduce((acc, b, i) => acc + b * i, 0)

  return res
}

export const solve2 = (input) => {}
