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
  return nums.map((x) => generateDomain(x, length))
}

function intersect(a: Set<number>, b: Set<number>): Set<number> {
  return new Set([...a].filter((x) => b.has(x)))
}

export function findConstraint(domain: Array<Set<number>>): Set<number> {
  return domain.reduce((a, b) => intersect(a, b))
}

export function applyConstraint(
  constraint: Set<number>,
  domain: Array<Set<number>>
): Array<Set<number>> {
  return domain.filter((x) => intersect(constraint, x).size == constraint.size)
}
