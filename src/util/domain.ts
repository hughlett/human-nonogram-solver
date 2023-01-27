function generateDomainHelper(
  pattern: Array<number>,
  domain: Array<Set<number>>,
  domainValue: Set<number>,
  lastStart: number,
  lastPatternValue: number,
  patternIndex: number,
  sum: number,
  length: number
) {
  if (sum == 0) {
    return domain.push(domainValue)
  }
  sum -= pattern[patternIndex]

  const start = lastStart + lastPatternValue + 1
  const end =
    length - sum - pattern.length + patternIndex - pattern[patternIndex] + 2

  for (let i = start; i < end; i++) {
    const rowCopy: Set<number> = new Set(domainValue)

    for (let j = 0; j < pattern[patternIndex]; j++) {
      rowCopy.add(i + j + 1)
    }
    generateDomainHelper(
      pattern,
      domain,
      rowCopy,
      i,
      pattern[patternIndex],
      patternIndex + 1,
      sum,
      length
    )
  }
}

export function generateDomain(
  pattern: Array<number>,
  length: number
): Array<Set<number>> {
  if (pattern.length == 1 && pattern[0] == 0) {
    return [new Set()]
  }

  const domain: Array<Set<number>> = []
  const sum = pattern.reduce((a, b) => a + b)

  generateDomainHelper(pattern, domain, new Set(), 0, -1, 0, sum, length)

  domain.forEach((set) => {
    for (let i = 1; i <= length; i++) {
      if (!set.has(i)) {
        set.add(-i)
      }
    }
  })

  return domain
}

export function generateAllDomains(
  patterns: Array<Array<number>>,
  length: number
) {
  const cache = new Map<string, Array<Set<number>>>()

  return patterns.map((x) => {
    const patternString = x.toString()
    const cacheHit = cache.get(patternString)

    if (cacheHit) {
      return cacheHit
    } else {
      const domain = generateDomain(x, length)
      cache.set(patternString, domain)
      return domain
    }
  })
}
