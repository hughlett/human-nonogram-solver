/**
 *
 * @param a
 * @param b
 * @returns
 */
function intersect(a: Set<number>, b: Set<number>): Set<number> {
  if (a.size < b.size) {
    return new Set([...a].filter((x) => b.has(x)))
  }
  return new Set([...b].filter((x) => a.has(x)))
}

/**
 *
 * @param domain
 * @returns
 */
export function searchForConstraints(domain: Array<Set<number>>): Set<number> {
  return domain.reduce((a, b) => intersect(a, b))
}

/**
 *
 * @param constraint
 * @param domain
 * @returns
 */
export function applyConstraint(
  constraint: number,
  domain: Array<Set<number>>
): Array<Set<number>> {
  return domain.filter((domainValue) => {
    return domainValue.has(constraint)
  })
}

/**
 *
 * @param domain
 * @param domainIndex
 * @param siblingDomains
 * @returns
 */
export function reduceDomain(
  domain: Array<Set<number>>,
  domainIndex: number,
  siblingDomains: Array<Array<Set<number>>>
): Set<number> {
  const constraints = searchForConstraints(domain)
  const visitedDomainIndexes: Set<number> = new Set()

  constraints.forEach((constraint) => {
    const siblingConstraint =
      constraint > 0 ? domainIndex + 1 : -(domainIndex + 1)
    const siblingDomainIndex = Math.abs(constraint) - 1

    siblingDomains[siblingDomainIndex] = applyConstraint(
      siblingConstraint,
      siblingDomains[siblingDomainIndex]
    )

    visitedDomainIndexes.add(Math.abs(constraint) - 1)
  })

  return visitedDomainIndexes
}
