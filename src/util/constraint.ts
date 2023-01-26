function intersect(a: Set<number>, b: Set<number>): Set<number> {
  return new Set([...a].filter((x) => b.has(x)))
}

export function findConstraint(domain: Array<Set<number>>): Set<number> {
  return domain.reduce((a, b) => intersect(a, b))
}

export function applyConstraint(
  constraint: number,
  domain: Array<Set<number>>
): Array<Set<number>> {
  return domain.filter((x) => {
    return x.has(constraint)
  })
}
