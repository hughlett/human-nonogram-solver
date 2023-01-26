import { applyConstraint, findConstraint } from './util/constraint'
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
  const generateEnd = performance.now()

  console.log(`Time to generate: ${generateEnd - generateStart} ms`)

  const solveStart = performance.now()

  const solvedRows = new Set()
  const solvedColumns = new Set()

  while (
    solvedRows.size !== rows.length &&
    solvedColumns.size !== columns.length
  ) {
    rowDomains.forEach((domain, index) => {
      if (!solvedRows.has(index)) {
        findConstraint(domain).forEach((knownValue) => {
          columnDomains[Math.abs(knownValue) - 1] =
            knownValue > 0
              ? applyConstraint(index + 1, columnDomains[knownValue - 1])
              : applyConstraint(
                  -(index + 1),
                  columnDomains[Math.abs(knownValue) - 1]
                )
        })
      }

      if (domain.length === 1) {
        solvedRows.add(index)
      }
    })
    columnDomains.forEach((domain, index) => {
      if (!solvedColumns.has(index)) {
        findConstraint(domain).forEach((knownValue) => {
          rowDomains[Math.abs(knownValue) - 1] =
            knownValue > 0
              ? applyConstraint(index + 1, rowDomains[knownValue - 1])
              : applyConstraint(
                  -(index + 1),
                  rowDomains[Math.abs(knownValue) - 1]
                )
        })
      }
      if (domain.length === 1) {
        solvedColumns.add(index)
      }
    })
  }
  const solveEnd = performance.now()
  console.log(solvedRows)
  console.log(solvedColumns)

  console.log(`Time to solve: ${solveEnd - solveStart} ms`)

  return []
}
