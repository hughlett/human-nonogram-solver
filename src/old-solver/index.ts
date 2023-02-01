import NonogramSolver from './solver'

interface BoardRowData {
  newRows: Array<Array<number>>
  newRowNums: Array<Array<number>>
}

interface RowColNums {
  newRowNums: Array<Array<number>>
  newColNums: Array<Array<number>>
}

const calcRows: (numRows: number, numColumns: number) => BoardRowData = (
  numRows,
  numColumns
) => {
  const newRowNums = []
  const newRows: Array<Array<number>> = []

  for (let i = 0; i < numRows; i++) {
    const randomRowNums = []
    const randomRow = []
    let count = 0

    for (let j = 0; j < numColumns; j++) {
      if (Math.random() < 0.6) {
        count++
        randomRow.push(1)
      } else {
        if (count !== 0) {
          randomRowNums.push(count)
        }
        count = 0
        randomRow.push(0)
      }
    }

    if (count !== 0) {
      randomRowNums.push(count)
    }
    if (randomRowNums.length === 0) {
      randomRowNums.push(0)
    }

    newRowNums.push(randomRowNums)
    newRows.push(randomRow)
  }

  return {
    newRowNums,
    newRows,
  }
}

const calcCols: (
  rows: BoardRowData,
  numRows: number,
  numColumns: number
) => Array<Array<number>> = (rows, numRows, numColumns) => {
  const newCols = rows.newRows[0].map((col, i) =>
    rows.newRows.map((row) => row[i])
  )
  const newColNums = []

  for (let i = 0; i < numColumns; i++) {
    const randomColNums = []
    let count = 0

    for (let j = 0; j < numRows; j++) {
      if (newCols[i][j] === 1) {
        count++
      } else {
        if (count !== 0) {
          randomColNums.push(count)
        }
        count = 0
      }
    }

    if (count !== 0) {
      randomColNums.push(count)
    }
    if (randomColNums.length === 0) {
      randomColNums.push(0)
    }

    newColNums.push(randomColNums)
  }

  return newColNums
}

export const createNums: (numRows: number, numColumns: number) => RowColNums = (
  numRows,
  numColumns
) => {
  const { newRows, newRowNums } = calcRows(numRows, numColumns)
  const newColNums = calcCols({ newRows, newRowNums }, numRows, numColumns)

  return { newRowNums, newColNums }
}

export const generateSolvablePuzzle = (numRows: number, numColumns: number) => {
  // const { newRowNums, newColNums } = createNums(numRows, numColumns)
  const newRowNums = [
    [2, 2],
    [2, 3, 2],
    [3, 3, 3, 2],
    [3, 3, 3, 3],
    [2, 3, 3, 3, 3, 2],
    [3, 3, 3, 3, 3, 3],
    [4, 2, 3, 2, 2, 4],
    [4, 2, 2, 2, 2, 3, 1],
    [3, 1, 2, 2, 2, 3, 3],
    [3, 2, 2, 2, 2, 2, 4],
    [3, 2, 15, 2, 4],
    [5, 19, 4],
    [6, 4, 3, 3],
    [6, 4, 4],
    [2, 4, 6, 2],
    [2, 2, 3, 3, 3, 2],
    [9, 2, 2, 2, 3, 9],
    [10, 2, 2, 2, 2, 2, 10],
    [4, 2, 3, 3, 2, 2, 3, 2, 5],
    [2, 5, 2, 4, 2],
    [5, 3, 2, 2, 5],
    [6, 3, 2, 3, 7],
    [6, 8, 9, 7],
    [4, 8, 7, 5],
    [4],
    [2],
    [2],
    [14],
    [16],
    [3, 3],
    [2, 2],
    [2, 2],
    [4, 4],
    [16],
    [12],
  ]
  const newColNums = [
    [1],
    [3, 2],
    [2, 3, 3],
    [3, 3, 3],
    [3, 3, 3, 3],
    [4, 2, 2, 2],
    [3, 3, 2, 3],
    [3, 2, 2, 2],
    [3, 2, 6],
    [2, 9],
    [2, 3, 3],
    [4, 4, 3, 2, 4],
    [7, 2, 5, 2, 6],
    [12, 2, 3, 2, 3, 2],
    [3, 1, 2, 2, 2, 3],
    [2, 2, 3, 2, 2, 2],
    [6, 2, 6, 2, 2, 2],
    [12, 4, 3, 2, 2],
    [12, 2, 2, 2],
    [2, 6, 2],
    [2, 6, 5, 2],
    [10, 9, 2, 2],
    [12, 3, 3, 2, 2],
    [6, 2, 2, 2, 2, 2, 2],
    [2, 2, 3, 2, 2, 2],
    [4, 3, 2, 2, 2, 3],
    [7, 3, 3, 2, 3, 2],
    [5, 3, 5, 2, 6],
    [4, 3, 3, 3, 4],
    [3, 5, 3],
    [3, 9],
    [4, 2, 6],
    [4, 2, 2, 2],
    [4, 2, 2, 3],
    [3, 2, 2, 3],
    [3, 3, 3],
    [3, 3, 3],
    [4, 3, 3],
    [2, 3, 3],
    [2, 1],
  ]
  let rowNums = newRowNums
  let colNums = newColNums
  let solver = new NonogramSolver(newRowNums, newColNums, numColumns, numRows)
  rowNums = newRowNums
  colNums = newColNums
  solver = new NonogramSolver(newRowNums, newColNums, numColumns, numRows)
  const start = performance.now()
  const solution = solver.solve()
  const time = performance.now() - start
  console.log(`Array: ${time}ms`)
  return { rowNums, colNums, solution }
}
