// INITIALIZATION
import * as functions from 'firebase-functions'
import { firestore, initializeApp } from 'firebase-admin'
initializeApp(functions.config().firebase)
firestore().settings({ timestampsInSnapshots: true })

// HELPERS
import { 
  checkWinner,
  findNextOpenRowInColumn,
  getOpponentId,
  getPlayerNumber, 
  isValidMove, 
} from './helpers'

// INTERFACES
import { GameBoard, Room } from './interfaces'




// FUNCTIONS
// create a player document when a new user signs up
export const authCreated = functions.auth.user().onCreate((user) => {
  return firestore().collection('players').doc(user.uid).set({
    username: user.displayName,
    email: user.email,
    wins: 0,
    losses: 0,
    started: 0,
    abandoned: 0
  })
})




// process the move submitted by a client application
// ensure the move is valid and legal
// update the database
// check for a winner and make updates accordingly
export const submitMove = functions.https.onCall(async (data: { roomId: string, columnIndex: number }, context) => {
  /* 
  data: {
    roomId: string
    columnIndex: number
  }
  */

  function getError(errorMessage: string): functions.https.HttpsError {
    console.error(errorMessage)
    return new functions.https.HttpsError('invalid-argument', errorMessage)
  }

  const { roomId, columnIndex } = data
  const playerId = context && context.auth ? context.auth.uid : null

  console.log(roomId, columnIndex, playerId)

  // validate the player is real
  if (!playerId) {
    throw getError(`Player ID ${playerId} not found`)
  }

  // validate it is the players turn
  const roomSnap = await firestore().doc(`rooms/${roomId}`).get()
  if (!roomSnap.exists) {
    throw getError(`Room ID ${roomId} not found`)
  }

  const room = <Room>roomSnap.data()
  if (room.currentTurnBy !== playerId) {
    throw getError(`${room.currentTurnBy} !== ${playerId}`)
  }

  // validate the move is legal
  const currentBoardSnap = await firestore().doc(`boards/${room.currentBoardId}`).get()
  if (!currentBoardSnap.exists) {
    throw getError(`Board ID ${room.currentBoardId} not found`)
  }
  
  const currentBoard = <GameBoard>{ ...currentBoardSnap.data(), board: JSON.parse(currentBoardSnap.get('board')) }

  if (!isValidMove(currentBoard.board, columnIndex)) {
    throw getError(`Column ${columnIndex} is not a valid move`)
  }

  // save the move into a new board document
  const newBoard = currentBoard.board
  newBoard[findNextOpenRowInColumn(currentBoard.board, columnIndex)][columnIndex] = getPlayerNumber(room, playerId)
  
  // save to database
  const batch = firestore().batch()
  
  const newBoardRef = firestore().collection('boards').doc()
  batch.set(newBoardRef, {
    board: JSON.stringify(newBoard),
    createdAt: firestore.Timestamp.now(),
    createdBy: playerId, 
    roomId
  })
  
  const opponentId = getOpponentId(room, playerId)
  const roomUpdate: {
    currentBoardId: string,
    currentTurnBy: string,
    status?: string
    updatedAt: Date,
    updatedBy: string,
    winnerId?: string
  } = {
    currentBoardId: newBoardRef.id,
    currentTurnBy: opponentId,
    updatedAt: new Date(),
    updatedBy: playerId
  }
  
  // evaluate if the new board is a winner
  if (!!checkWinner(newBoard)) {
    roomUpdate.currentTurnBy = playerId
    roomUpdate.status = 'completed'
    roomUpdate.winnerId = playerId

    batch.update(firestore().doc(`players/${playerId}`), {
      wins: firestore.FieldValue.increment(1),
    })

    batch.update(firestore().doc(`players/${opponentId}`), {
      losses: firestore.FieldValue.increment(1),
    })
  }

  batch.update(firestore().doc(`rooms/${roomId}`), roomUpdate)

  await batch.commit()

  const message = `TURN EVALUATED :: player ${playerId}, room ${roomId}`
  console.log(message)
  return { message }
})

