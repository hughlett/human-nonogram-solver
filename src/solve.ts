import { generateAllDomains } from './util/domain'

export function solve(
  rows: Array<Array<number>>,
  rowLength: number,
  columns: Array<Array<number>>,
  columnLength: number
): Array<Set<number>> {
  const rowDomains = generateAllDomains(rows, rowLength)
  const columnDomains = generateAllDomains(columns, columnLength)
}
