<script>
  import { format } from 'timeago.js'
  import { join } from '../data-actions'
  import { players, profile } from '../stores'
  
  export let room
  let isJoining = false

  $: getPlayerUsername = (playerUid) => {
    const player = $players.find(p => p.uid === playerUid)
    return player ? player.username : 'not found' 
  }

  async function joinRoom() {
    isJoining = true
    try {
      await join($profile.uid, room.id, room.playerIds)
    } catch (err) {
      console.error(`ERROR JOINING ROOM :: ${err}`)
    }
    isJoining = false
  }
</script>

<div class="box media has-background-white-ter">
  <div class="media-content">
    <!-- <div class="is-size-7 is-italic has-text-grey">{ room.id }</div> -->
    <div class="is-size-3 has-text-weight-bold">{ getPlayerUsername(room.createdBy) }</div>
    <div class="is-size-7 is-italic has-text-grey">updated { format(room.updatedAt.toDate(), 'en_US') }</div>
  </div>
  <div class="media-right">
    <button class="button is-primary { isJoining ? 'is-loading' : '' }" on:click={joinRoom}>Join</button>
  </div>
</div>