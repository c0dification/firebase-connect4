<script>
  import { format } from 'timeago.js'
  import { abandon, destroy } from '../data-actions'
  import { currentRoom, players, profile } from '../stores'
  
  export let room

  let turnStatus = 'loading'
  let opponentId
  
  $: if (room) {
    if (room.status === 'started' && room.currentTurnBy && room.currentTurnBy === $profile.uid) {
      turnStatus = 'your-turn'
    } else if (room.status === 'started' && room.currentTurnBy && room.currentTurnBy !== $profile.uid) {
      turnStatus = 'their-turn'
    } else if (room.status === 'completed') {
      turnStatus = 'completed-room'
    } else if (room.status === 'pending') {
      turnStatus = 'open-room'
    } else {
      turnStatus = 'error'
    }
    opponentId = room.playerIds.filter(playerId => playerId !== $profile.uid)[0]
  }
    
  $: getOpponentUsername = () => {
    const player = $players.find(p => p.uid === opponentId)
    return player ? player.username : 'not found' 
  }

  function playRoom() {
    currentRoom.set(room.id)
  }

  function viewRoom() {
    currentRoom.set(room.id)
  }

  function deleteRoom() {
    destroy(room.id)
  }

  function abandonRoom() {
    abandon(room.id, $profile.uid, opponentId)
  }
</script>

<style>
  .your-turn {
    border-left: 10px hsl(141, 53%, 53%) solid;
  }
  .their-turn {
    border-left: 10px hsl(217, 71%, 53%) solid;
  }
  .open-room {
    border-left: 10px hsl(348, 86%, 61%) solid;
  }
  .completed-room {
    border-left: 10px hsl(0, 0%, 21%) solid;
  }
</style>

<div class="box has-background-white-ter { turnStatus }">
  <!-- <div class="is-size-7 is-italic has-text-grey">{ turnStatus } { room.id }</div> -->
  <div class="is-size-3 has-text-weight-bold">
    <span>{ $profile.username }</span>
    <span> vs. </span>
    <span>{ turnStatus === 'open-room' ? '???' : getOpponentUsername() }</span>
  </div>
  <div class="is-size-7 is-italic has-text-grey">updated { format(room.updatedAt.toDate(), 'en_US') }</div>
  <div>
    {#if turnStatus === 'your-turn'}
      <button class="button is-primary" on:click={playRoom}>Play</button>
      <button class="button is-danger" on:click={abandonRoom}>Abandon</button>
    {:else if turnStatus === 'their-turn'}
      <button class="button is-info" on:click={viewRoom}>View</button>
      <button class="button is-danger" on:click={abandonRoom}>Abandon</button>
    {:else if turnStatus === 'completed-room'}
      <button class="button is-info" on:click={viewRoom}>View</button>
      <button class="button is-danger" on:click={deleteRoom}>Dismiss</button>
      <span class="tag is-large">
        {#if room.winnerId === $profile.uid}
          WINNER 🤩
        {:else}
          LOSER 😬
        {/if}
      </span>
    {:else}
      <button class="button is-danger" on:click={deleteRoom}>Delete</button>
    {/if}
  </div>
</div>