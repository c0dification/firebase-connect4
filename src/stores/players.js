import { derived, writable } from 'svelte/store'
import { db } from '../firebase'

const playerStore = writable([])

const init = () => db.collection(`players`).onSnapshot(snapshot => {
  const players = []
  snapshot.forEach(doc => players.push({ ...doc.data(), uid: doc.id }))
  playerStore.set(players)
})

export const players = {
  subscribe: playerStore.subscribe,
  set: init
}
