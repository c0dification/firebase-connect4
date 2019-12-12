import { firestore } from 'firebase-admin'

export interface Room {
  createdAt: firestore.Timestamp
  createdBy: string
  currentBoardId: string
  currentTurnBy: string
  playerIds: Array<string>
  status: 'completed' | 'pending' | 'started'
  updatedAt: firestore.Timestamp
  updatedBy: string
  winnerId?: string
}

export interface GameBoard {
  board: Array<Array<number>>
  createdAt: firestore.Timestamp
  createdBy: string
  roomId: string
}