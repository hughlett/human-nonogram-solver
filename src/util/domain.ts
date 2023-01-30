function generateDomainHelper(
  clue: Array<number>,
  domainLength: number,
  domain: Array<Set<number>>,
  value: Set<number>,
  lastStartIndex: number,
  lastClueValue: number,
  clueIndex: number,
  remainingClueSum: number
) {
  if (remainingClueSum == 0) {
    for (let i = 1; i <= domainLength; i++) {
      if (!value.has(i)) {
        value.add(-i)
      }
    }
    return domain.push(value)
  }

  remainingClueSum -= clue[clueIndex]

  const startIndex = lastStartIndex + lastClueValue + 1
  const endIndex =
    domainLength -
    remainingClueSum -
    clue[clueIndex] -
    clue.length +
    clueIndex +
    1

  for (let i = startIndex; i <= endIndex; i++) {
    const valueCopy = new Set(value)

    for (let j = 0; j < clue[clueIndex]; j++) {
      valueCopy.add(i + j + 1)
    }
    generateDomainHelper(
      clue,
      domainLength,
      domain,
      valueCopy,
      i,
      clue[clueIndex],
      clueIndex + 1,
      remainingClueSum
    )
  }
}

export function generateDomain(
  clue: Array<number>,
  domainLength: number
): Array<Set<number>> {
  if (clue.length == 1 && clue[0] == 0) {
    return [new Set()]
  }

  const domain: Array<Set<number>> = []
  const clueSum = clue.reduce((a, b) => a + b)

  generateDomainHelper(clue, domainLength, domain, new Set(), 0, -1, 0, clueSum)

  return domain
}

export function generateAllDomains(
  clues: Array<Array<number>>,
  domainLength: number
): Array<Array<Set<number>>> {
  return clues.map((clue) => {
    return generateDomain(clue, domainLength)
  })
}
