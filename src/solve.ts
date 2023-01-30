import { reduceDomain } from './util/constraint'
import { generateAllDomains } from './util/domain'

export function solve(
  rows: Array<Array<number>>,
  rowLength: number,
  columns: Array<Array<number>>,
  columnLength: number
) {
  const rowDomains = generateAllDomains(rows, rowLength)
  const columnDomains = generateAllDomains(columns, columnLength)

  const solvedRows = new Set()
  const solvedColumns = new Set()

  const rowsToVisit = new Set(Array.from(Array(rows.length).keys()))
  const comulmnsToVisit = new Set(Array.from(Array(columns.length).keys()))

  while (
    solvedRows.size !== rows.length &&
    solvedColumns.size !== columns.length
  ) {
    rowsToVisit.forEach((index) => {
      const visitedColumns = reduceDomain(
        rowDomains[index],
        index,
        columnDomains
      )

      if (rowDomains[index].length === 1) {
        solvedRows.add(index)
      }

      visitedColumns.forEach((index) => {
        comulmnsToVisit.add(index)
      })

      rowsToVisit.delete(index)
    })

    comulmnsToVisit.forEach((index) => {
      const visitedRows = reduceDomain(columnDomains[index], index, rowDomains)

      if (columnDomains[index].length === 1) {
        solvedColumns.add(index)
      }

      visitedRows.forEach((index) => {
        rowsToVisit.add(index)
      })

      comulmnsToVisit.delete(index)
    })
  }

  return
}
