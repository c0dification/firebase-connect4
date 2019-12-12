import { Room } from './interfaces'

/*
  SAMPLE BOARD:
  [ [ 0, 0, 2 ], 
    [ 0, 1, 2 ], 
    [ 0, 1, 2 ] ]

  COLUMN 0 should yield 2 (row 2 is the next open space in column)
  COLUMN 1 should yield 0 (row 0 is the next open space in column)
  COLUMN 2 should yield -1 (column is full)
*/
export function findNextOpenRowInColumn(board: number[][], column: number): number {
  const freeIndex = board.findIndex(row => row[column] !== 0)
  if (freeIndex === -1) {
    return board.length - 1
  }
  return freeIndex - 1
}

/*
  a move is valid when the column is not full
*/
export function isValidMove(board: number[][], column: number): boolean {
  return findNextOpenRowInColumn(board, column) !== -1
}

/*
  the player index in the rooms.playerIds array
*/
export function getPlayerNumber (room: Room, playerId: string): number {
  return room.playerIds.indexOf(playerId) + 1
}

/*
  get the opponent ID
*/
export function getOpponentId(room: Room, playerId: string): string {
  return room.playerIds.filter(id => id !== playerId)[0]
}

/*
  evaluate if a given game board is a winner

  code modified from https://stackoverflow.com/questions/33181356/connect-four-game-checking-for-wins-js
*/
function checkLine(a: number, b: number, c: number, d: number) {
  // Check first cell non-zero and all cells match
  return ((a !== 0) && (a === b) && (a === c) && (a === d))
}

export function checkWinner(board: number[][]): number {
  // Check down
  for (let r = 0; r < 3; r++)
      for (let c = 0; c < 7; c++)
          if (checkLine(board[r][c], board[r+1][c], board[r+2][c], board[r+3][c]))
              return board[r][c];

  // Check right
  for (let r = 0; r < 6; r++)
      for (let c = 0; c < 4; c++)
          if (checkLine(board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]))
              return board[r][c];

  // Check down-right
  for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++)
          if (checkLine(board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]))
              return board[r][c];

  // Check down-left
  for (let r = 3; r < 6; r++)
      for (let c = 0; c < 4; c++)
          if (checkLine(board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3]))
              return board[r][c];

  return 0
}
