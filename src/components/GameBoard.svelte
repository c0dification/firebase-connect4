<script>
  import GameBoardHeaderTile from './GameBoardHeaderTile.svelte'
  import GameBoardRow from './GameBoardRow.svelte'
  export let board
  export let isCurrentTurn

  async function dropToken(columnNumber) {

  }
</script>

<div class="container box has-background-dark">

  <!-- {#if isCurrentTurn} -->
    <div class="level">
      {#each board[0] as headerTile, i}
        <GameBoardHeaderTile index={ i } isActive={ isCurrentTurn && headerTile === 0 }  />
      {/each}
    </div>
  <!-- {/if} -->

  {#each board as boardRow}
    <GameBoardRow rowStates={ boardRow } />
  {/each}
</div>