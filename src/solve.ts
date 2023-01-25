import {
  applyPositiveConstraint,
  applyNegativeConstraint,
  findConstraint,
} from './util/constraint'
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
          columnDomains[knownValue] = applyPositiveConstraint(
            new Set([index]),
            columnDomains[knownValue]
          )
        })
      }

      if (domain.length === 1) {
        solvedRows.add(index)

        const domainSolution = domain[0]
        for (let i = 0; i < rowLength; i++) {
          if (!domainSolution.has(i)) {
            columnDomains[i] = applyNegativeConstraint(index, columnDomains[i])
          }
        }
      }
    })
    columnDomains.forEach((domain, index) => {
      if (!solvedColumns.has(index)) {
        findConstraint(domain).forEach((knownValue) => {
          rowDomains[knownValue] = applyPositiveConstraint(
            new Set([index]),
            rowDomains[knownValue]
          )
        })
      }
      if (domain.length === 1) {
        solvedColumns.add(index)

        const domainSolution = domain[0]
        for (let i = 0; i < columnLength; i++) {
          if (!domainSolution.has(i)) {
            rowDomains[i] = applyNegativeConstraint(index, rowDomains[i])
          }
        }
      }
    })
  }
  const solveEnd = performance.now()
  console.log(solvedRows)
  console.log(solvedColumns)

  console.log(`Time to solve: ${solveEnd - solveStart} ms`)

  return []
}
