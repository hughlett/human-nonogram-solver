function intersect(a: Set<number>, b: Set<number>): Set<number> {
  return new Set([...a].filter((x) => b.has(x)))
}

export function searchForConstraints(domain: Array<Set<number>>): Set<number> {
  return domain.reduce((a, b) => intersect(a, b))
}

export function applyConstraint(
  constraint: number,
  domain: Array<Set<number>>
): Array<Set<number>> {
  return domain.filter((domainValue) => {
    return domainValue.has(constraint)
  })
}

export function reduceDomain(
  domain: Array<Set<number>>,
  index: number,
  siblingDomains: Array<Array<Set<number>>>
): Set<number> {
  const constraints = searchForConstraints(domain)
  const visitedDomainIndexes: Set<number> = new Set()

  constraints.forEach((constraint) => {
    const foo = constraint > 0 ? index + 1 : -(index + 1)
    const bar = Math.abs(constraint) - 1

    siblingDomains[bar] = applyConstraint(foo, siblingDomains[bar])

    visitedDomainIndexes.add(Math.abs(constraint) - 1)
  })

  return visitedDomainIndexes
}
