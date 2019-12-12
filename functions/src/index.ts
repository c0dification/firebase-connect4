// INITIALIZATION
import * as functions from 'firebase-functions'
import { firestore, initializeApp } from 'firebase-admin'
initializeApp(functions.config().firebase)
firestore().settings({ timestampsInSnapshots: true })

// HELPERS
// import { 
//   checkWinner,
//   findNextOpenRowInColumn,
//   getOpponentId,
//   getPlayerNumber, 
//   isValidMove, 
// } from './helpers'

// INTERFACES
// import { GameBoard, Room } from './interfaces'




// FUNCTIONS
// create a player document when a new user signs up
// export const authCreated = functions.auth.user().onCreate((user) => {
  
// })




// process the move submitted by a client application
// ensure the move is valid and legal
// update the database
// check for a winner and make updates accordingly
// export const submitMove = functions.https.onCall(async (data, context) => {
  
// })

