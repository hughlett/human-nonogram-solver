import { reduceSiblingDomain } from './util/constraint'
import { generateAllDomains } from './util/domain'

export function solve(
  rows: Array<Array<number>>,
  rowLength: number,
  columns: Array<Array<number>>,
  columnLength: number
): Array<Set<number>> {
  const generateStart = performance.now()

  const rowDomains = generateAllDomains(rows, rowLength)
  const columnDomains = generateAllDomains(columns, columnLength)

  const solvedRows = new Set()
  const solvedColumns = new Set()

  const generateEnd = performance.now()
  console.log(`Time to generate: ${generateEnd - generateStart} ms`)

  const solveStart = performance.now()

  while (
    solvedRows.size !== rows.length &&
    solvedColumns.size !== columns.length
  ) {
    rowDomains.forEach((domain, index) => {
      reduceSiblingDomain(domain, index, columnDomains)
      if (domain.length === 1) {
        solvedRows.add(index)
      }
    })
    columnDomains.forEach((domain, index) => {
      reduceSiblingDomain(domain, index, rowDomains)
      if (domain.length === 1) {
        solvedColumns.add(index)
      }
    })
  }

  const solveEnd = performance.now()
  console.log(`Time to solve: ${solveEnd - solveStart} ms`)

  return []
}
