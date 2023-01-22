import { generateAllDomains } from './utils'

export function solve(
  rows: Array<Array<number>>,
  rowLength: number,
  columns: Array<Array<number>>,
  columnLength: number
): Array<Set<number>> {
  const rowDomains = generateAllDomains(rows, rowLength)
  const columnDomains = generateAllDomains(columns, columnLength)
}
