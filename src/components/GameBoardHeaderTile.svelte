<script>
  import { functions } from '../firebase'
  import { currentRoom } from '../stores'

  export let index
  export let isActive

  async function press() {
    const submitMove = functions.httpsCallable('submitMove')
    await submitMove({ roomId: $currentRoom.room.id, columnIndex: index })
  }
</script>

<div class="level-item">
  <button class="button is-info" disabled={!isActive} on:click={press}>
    <span class="icon is-small">
      <i class="fas fa-chevron-down"></i>
    </span>
  </button>
</div>