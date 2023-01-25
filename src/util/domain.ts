function generateDomainHelper(
  nums: Array<number>,
  domain: Array<Set<number>>,
  row: Set<number>,
  lastStart: number,
  lastNum: number,
  index: number,
  sum: number,
  length: number
) {
  if (sum == 0) {
    return domain.push(row)
  }
  sum -= nums[index]

  const start = lastStart + lastNum + 1
  const end = length - sum - nums.length + index - nums[index] + 2

  for (let i = start; i < end; i++) {
    const rowCopy: Set<number> = new Set()
    row.forEach((value) => rowCopy.add(value))

    for (let j = 0; j < nums[index]; j++) {
      rowCopy.add(i + j)
    }
    generateDomainHelper(
      nums,
      domain,
      rowCopy,
      i,
      nums[index],
      index + 1,
      sum,
      length
    )
  }
}

export function generateDomain(
  nums: Array<number>,
  length: number
): Array<Set<number>> {
  if (nums.length == 1 && nums[0] == 0) {
    return [new Set()]
  }

  const domain: Array<Set<number>> = []
  const sum = nums.reduce((a, b) => a + b)

  generateDomainHelper(nums, domain, new Set(), 0, -1, 0, sum, length)

  return domain
}

export function generateAllDomains(nums: Array<Array<number>>, length: number) {
  const cache = new Map<string, Array<Set<number>>>()

  return nums.map((x) => {
    // Original low-performance solution
    // generateDomain(x, length)

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
