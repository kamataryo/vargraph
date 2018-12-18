const assert = require('assert')
const parse = require('./')

const describe = (title, test) => {
  try {
    test()
    process.stdout.write(`${title}: OK\n`)
  } catch (e) {
    process.stdout.write(`${title}: NG\n`)
    process.stderr.write(e)
  }
}

describe('case 1', () => {
  const code = `
    const a = 1
    const b = a
  `

  const expected = {
    a: { incomes: ['b'], outcomes: [] },
    b: { incomes: [], outcomes: ['a'] }
  }
  assert.deepEqual(parse(code), expected)
})

describe('case 2', () => {
  const code = `
    const a = 1
    const b = a + 1
  `

  const expected = {
    a: { incomes: ['b'], outcomes: [] },
    b: { incomes: [], outcomes: ['a'] }
  }
  assert.deepEqual(parse(code), expected)
})

describe('case 3', () => {
  const code = `
    const a = 1
    const b = 2
    const c = a + b
  `

  const expected = {
    a: { incomes: ['c'], outcomes: [] },
    b: { incomes: ['c'], outcomes: [] },
    c: { incomes: [], outcomes: ['a', 'b'] }
  }
  assert.deepEqual(parse(code), expected)
})

describe('case 4', () => {
  const code = `
    const a = { x: 1 }
    const b = a.x
  `

  const expected = {
    x: { incomes: ['a', 'b'], outcomes: [] },
    a: { incomes: ['b'], outcomes: ['x'] },
    b: { incomes: [], outcomes: ['a', 'x'] }
  }
  assert.deepEqual(parse(code), expected)
})

describe('case 5', () => {
  const code = `
    const a = []
    const b = [...a, ...a]
  `

  const expected = {
    a: { incomes: ['b'], outcomes: [] },
    b: { incomes: [], outcomes: ['a'] }
  }
  assert.deepEqual(parse(code), expected)
})

describe('case 6', () => {
  const code = `
    const a = { x: 1, y: 1 }
    const { x, y } = a
  `

  const expected = {
    x: { incomes: ['a'], outcomes: [] },
    y: { incomes: ['a'], outcomes: [] },
    a: { incomes: [], outcomes: ['x', 'y'] }
  }
  assert.deepEqual(parse(code), expected)
})
