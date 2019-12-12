import { writable } from 'svelte/store'
import { db } from '../firebase'

const defaultState = {
  active: false,
  room: null,
  boards: null
}

let roomSubscription
let boardsSubscription

const roomStore = writable(defaultState)

const setRoom = roomId => {

  roomSubscription = db.doc(`rooms/${roomId}`)
    .onSnapshot(doc => {
      roomStore.update(current => {
        return {
          ...current,
          active: current.boards !== null,
          room: { ...doc.data(), id: doc.id }
        }
      })
    })

  boardsSubscription = db.collection('boards')
    .where('roomId', '==', roomId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const boards = []
      snapshot.forEach(doc => boards.push({ ...doc.data(), id: doc.id }))
      roomStore.update(current => {
        return {
          ...current,
          active: current.room !== null,
          boards
        }
      })
    })
}

const clearRoom = () => {
  roomSubscription()
  boardsSubscription()
  roomStore.set(defaultState)
}

const currentRoom = {
  subscribe: roomStore.subscribe,
  set: setRoom,
  clear: clearRoom
}

export { currentRoom }
