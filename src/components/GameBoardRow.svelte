<script>
  import GameBoardRowTile from './GameBoardRowTile.svelte'
  export let rowStates
</script>

<div class="level tags are-large">
  {#each rowStates as state}
    <GameBoardRowTile { state } />
  {/each}
</div>