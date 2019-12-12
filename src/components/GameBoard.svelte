<script>
  import GameBoardHeaderTile from './GameBoardHeaderTile.svelte'
  import GameBoardRow from './GameBoardRow.svelte'
  export let board
  export let isCurrentTurn
  export let winnerId
</script>

<div class="container box has-background-dark">

  <!-- {#if isCurrentTurn} -->
    <div class="level">
      {#each board[0] as headerTile, i}
        <GameBoardHeaderTile index={ i } isActive={ !winnerId && isCurrentTurn && headerTile === 0 }  />
      {/each}
    </div>
  <!-- {/if} -->

  {#each board as boardRow}
    <GameBoardRow rowStates={ boardRow } />
  {/each}
</div>