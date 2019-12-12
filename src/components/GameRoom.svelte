<script>
  import { derived } from 'svelte/store'
  import { abandon } from '../data-actions'
  import { currentRoom, players, profile } from '../stores'
  import GameBoard from './GameBoard.svelte'

  const getOpponentId = () => $currentRoom.room.playerIds.filter(playerId => playerId !== $profile.uid)[0]
  $: getOpponentUsername = () => {
    const player = $players.find(p => p.uid === getOpponentId())
    return player ? player.username : 'not found' 
  }

  let currentBoardIndex = 0
  $: getCurrentTurn = () => $currentRoom.boards.length - currentBoardIndex
  $: isPlayerTurn = () => $currentRoom.room.currentTurnBy === $profile.uid && getCurrentTurn() === $currentRoom.boards.length
  $: getCurrentBoard = () => JSON.parse($currentRoom.boards[currentBoardIndex].board)

  function goBack() {
    if (currentBoardIndex < $currentRoom.boards.length - 1) {
      currentBoardIndex++
    }
  }

  function goForward() {
    if (currentBoardIndex > 0) {
      currentBoardIndex--
    }
  }

  function abandonRoom() {
    abandon($currentRoom.room.id, $profile.uid, getOpponentId())
  }

  function returnHome() {
    currentRoom.clear()
  }
</script>

<div class="level">
  
  <div class="level-left has-text-success">
    <div>
      <p class="title has-text-success">{ $profile.username }</p>
      {#if isPlayerTurn()}
        <p class="tag is-success heading">CURRENT TURN</p>
      {:else}
        <p class="heading">WAITING ...</p>
      {/if}
    </div>
  </div>

  <div class="level-item">
    <button class="button" on:click="{ goBack }">
      <span class="icon is-large">
        <i class="fas fa-chevron-left"></i>
      </span>
    </button>
  </div>
  <div class="level-item">
    <p class="title">Turn { getCurrentTurn() }</p>
  </div>
  <div class="level-item">
    <button class="button" on:click="{ goForward }">
      <span class="icon is-large">
        <i class="fas fa-chevron-right"></i>
      </span>
    </button>
  </div>

  <div class="level-right has-text-link">
    <div>
      <p class="title has-text-link">{ getOpponentUsername() }</p>
      {#if !isPlayerTurn() && getCurrentTurn() === $currentRoom.boards.length}
        <p class="tag is-link heading">CURRENT TURN</p>
      {:else}
        <p class="heading">WAITING ...</p>
      {/if}
    </div>
  </div>

</div>

<div class="container">
      
  <GameBoard board={ getCurrentBoard() } isCurrentTurn={ isPlayerTurn() } />

  <div class="level">
    <div class="level-item">
      <button class="button is-info" on:click={returnHome}>Return to Lobby</button>
    </div>
    <div class="level-item">
      <button class="button is-danger" on:click={abandonRoom}>Give Up!</button>
    </div>
  </div>
</div>
