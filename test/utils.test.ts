import { findConstraint } from '@/util/constraint'
import { generateAllDomains, generateDomain } from '@/util/domain'

test('domains generated correctly', () => {
  const actual = generateAllDomains([[1, 2], [3], [0], [5]], 5)
  const expected = [
    [new Set([0, 2, 3]), new Set([0, 3, 4]), new Set([1, 3, 4])],
    [new Set([0, 1, 2]), new Set([1, 2, 3]), new Set([2, 3, 4])],
    [new Set()],
    [new Set([0, 1, 2, 3, 4])],
  ]
  expect(actual).toEqual(expected)
})

describe('finding constraints', () => {
  test('when no constraint exists should return an empty Set', () => {
    const domain = generateDomain([1], 5)
    const actual = findConstraint(domain)
    const expected = new Set()
    expect(actual).toEqual(expected)
  })

  test('when a domain has a length of one should return the remaining Set', () => {
    const domain = generateDomain([2, 2], 5)
    const actual = findConstraint(domain)
    const expected = new Set([0, 1, 3, 4])
    expect(actual).toEqual(expected)
  })

  test('when a single constraint exists should return the constraint', () => {
    const domain = generateDomain([2], 3)
    const actual = findConstraint(domain)
    const expected = new Set([1])
    expect(actual).toEqual(expected)
  })

  test('when multiple constraint exists should return all constraints', () => {
    const domain = generateDomain([3], 4)
    const actual = findConstraint(domain)
    const expected = new Set([1, 2])
    expect(actual).toEqual(expected)
  })
})
