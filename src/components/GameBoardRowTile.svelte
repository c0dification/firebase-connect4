<script>
  import { currentRoom, profile } from '../stores'

  export let state

  $: getStyle = () => {
    const playerNumber = $currentRoom.room.playerIds.indexOf($profile.uid) + 1
    let style = playerNumber === state ? 'current-player' : 'opponent-player'
    if (state === 0) {
      style = 'empty'
    }
    return style
  }
</script>

<style>
  .bordered {
    border: 2px solid hsl(0, 0%, 21%);
  }
  .empty {
    background-color: hsl(0, 0%, 86%);
  }
  .current-player {
    background-color: hsl(141, 71%, 48%);
  }
  .opponent-player {
    background-color: hsl(204, 86%, 53%);
  }
</style>

<div class="level-item tag { getStyle() }">
  <!-- { state } -->
</div>