import { derived, writable } from 'svelte/store'
import { db } from '../firebase'

const profileStore = writable({})

const setUser = uid => db.doc(`players/${uid}`).onSnapshot(doc => profileStore.set({ ...doc.data(), uid }))

const profile = {
  subscribe: profileStore.subscribe,
  set: setUser
}

export { profile }

export const profileStats = derived(profile, $profile => {
  return {
    activeGames: $profile.started - $profile.wins - $profile.losses,
    wins: $profile.wins,
    losses: $profile.losses,
    reliability: $profile.started ? Math.ceil((($profile.started - $profile.abandoned) / $profile.started) * 100) : 100
  }
})
