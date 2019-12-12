import { db, dbFieldValue } from '../firebase'

/* CREATES A NEW ROOM */
export const add = (uid) => {
  return db.collection('rooms').add({
    playerIds: [ uid ],
    createdAt: new Date(),
    createdBy: uid,
    updatedAt: new Date(),
    updatedBy: uid,
    status: 'pending'
  })
}

/* DELETES AN OPEN ROOM */
export const destroy = (roomId) => {
  return db.doc(`rooms/${roomId}`).delete()
}

/* JOINS A PLAYER TO AN OPEN ROOM */
export const join = (playerId, roomId, roomPlayerIds) => {
  const batch = db.batch()
  const currentBoardRef = db.collection('boards').doc()
  batch.set(currentBoardRef, {
    board: JSON.stringify([[0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]]),
    createdAt: new Date(),
    createdBy: playerId, 
    roomId
  })
  batch.update(db.doc(`rooms/${roomId}`), {
    currentBoardId: currentBoardRef.id,
    currentTurnBy: playerId,
    playerIds: dbFieldValue.arrayUnion(playerId),
    status: 'started',
    updatedAt: new Date(),
    updatedBy: playerId
  })
  batch.update(db.doc(`players/${roomPlayerIds[0]}`), { started: dbFieldValue.increment(1) })
  batch.update(db.doc(`players/${playerId}`), { started: dbFieldValue.increment(1) })
  return batch.commit()
}

export const abandon = (roomId, abandondedBy, wonBy) => {
  const batch = db.batch()

  // update room status and winnerId
  batch.update(db.doc(`rooms/${roomId}`), {
    status: 'completed',
    updatedAt: new Date(),
    updatedBy: abandondedBy,
    winnerId: wonBy
  })
  
  // update abandondedBy status
  batch.update(db.doc(`players/${abandondedBy}`), {
    losses: dbFieldValue.increment(1),
    abandoned: dbFieldValue.increment(1)
  })

  // update wonBy status
  batch.update(db.doc(`players/${wonBy}`), {
    wins: dbFieldValue.increment(1)
  })

  return batch.commit()
}