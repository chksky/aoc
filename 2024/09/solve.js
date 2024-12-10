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

const genBlocks2 = (map) => {
  const blocks = []
  for (let i = 0; i < map.length; i++) {
    let blockValue = i % 2 === 0 ? i / 2 : '.'
    blocks.push({ size: map[i], val: blockValue })
  }

  return blocks
}

const compact2 = (blocks) => {
  for (let i = blocks.length - 1; i > 0; i--) {
    const { val, size } = blocks[i]
    if (val === '.') continue

    const firstEmplyI = blocks.findIndex((b) => b.val === '.' && b.size >= size)
    if (firstEmplyI > i || firstEmplyI === -1) continue
    const emptySize = blocks[firstEmplyI].size
    if (emptySize < size) continue
    else if (emptySize === size) {
      blocks[firstEmplyI] = {
        size,
        val,
      }
      blocks[i] = {
        size,
        val: '.',
      }
    } else {
      blocks[firstEmplyI] = {
        size: emptySize - size,
        val: '.',
      }
      blocks[i] = {
        size,
        val: '.',
      }
      blocks.splice(firstEmplyI, 0, { val, size })
      i++
    }
  }

  return blocks
}

const calc = (blocks) => {
  let accI = 0
  let res = 0
  for (let i = 0; i < blocks.length; i++) {
    const { size, val } = blocks[i]

    accI += size
    if (val === '.') continue
    const avg = (accI + (accI - size) - 1) / 2
    res += val * size * avg
  }

  return res
}

export const solve2 = (input) => {
  const map = parse(input)

  const blocks = compact2(genBlocks2(map))

  const res = calc(blocks)

  return res
}
