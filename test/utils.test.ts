import { generateDomain } from '@/utils'

describe('Generating domains', () => {
  test('with no values returns an empty array', () => {
    expect(generateDomain([0], 1)).toEqual([])
  })

  test('no values', () => {
    expect(generateDomain([1], 3)).toEqual([
      new Set([0]),
      new Set([1]),
      new Set([2]),
    ])
  })

  test('single value without space', () => {
    expect(generateDomain([3], 3)).toEqual([new Set([0, 1, 2])])
  })

  test('single value with space', () => {
    expect(generateDomain([3], 4)).toEqual([
      new Set([0, 1, 2]),
      new Set([1, 2, 3]),
    ])
  })

  test('multiple values without space', () => {
    expect(generateDomain([2, 1], 4)).toEqual([new Set([0, 1, 3])])
  })

  test('multiple values with space', () => {
    expect(generateDomain([2, 1], 5)).toEqual([
      new Set([0, 1, 3]),
      new Set([0, 1, 4]),
      new Set([1, 2, 4]),
    ])
  })

  test('multiple values with space', () => {
    expect(generateDomain([2, 1], 5)).toEqual([
      new Set([0, 1, 3]),
      new Set([0, 1, 4]),
      new Set([1, 2, 4]),
    ])
  })
})
