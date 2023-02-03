import { searchForConstraints } from '../src/utils/constraint'
import { generateAllDomains, generateDomain } from '../src/utils/domain'

test('domains generated correctly', () => {
  const actual = generateAllDomains([[1, 2], [3], [0], [5], [5]], 5)
  const expected = [
    [
      new Set([1, 3, 4, -2, -5]),
      new Set([1, 4, 5, -2, -3]),
      new Set([2, 4, 5, -1, -3]),
    ],
    [
      new Set([1, 2, 3, -4, -5]),
      new Set([2, 3, 4, -1, -5]),
      new Set([3, 4, 5, -1, -2]),
    ],
    [new Set()],
    [new Set([1, 2, 3, 4, 5])],
    [new Set([1, 2, 3, 4, 5])],
  ]

  expect(actual).toEqual(expected)
})

describe('finding constraints', () => {
  test('when no constraint exists should return an empty Set', () => {
    const domain = generateDomain([1], 5)
    const actual = searchForConstraints(domain)
    const expected = new Set()
    expect(actual).toEqual(expected)
  })

  test('when a domain has a length of one should return the remaining Set', () => {
    const domain = generateDomain([2, 2], 5)
    const actual = searchForConstraints(domain)
    const expected = new Set([1, 2, 4, 5, -3])
    expect(actual).toEqual(expected)
  })

  test('when a single constraint exists should return the constraint', () => {
    const domain = generateDomain([2], 3)
    const actual = searchForConstraints(domain)
    const expected = new Set([2])
    expect(actual).toEqual(expected)
  })

  test('when multiple constraint exists should return all constraints', () => {
    const domain = generateDomain([3], 4)
    const actual = searchForConstraints(domain)
    const expected = new Set([2, 3])
    expect(actual).toEqual(expected)
  })
})
