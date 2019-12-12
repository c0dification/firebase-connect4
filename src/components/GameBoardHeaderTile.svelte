<script>
  import { functions } from '../firebase'
  import { currentRoom } from '../stores'

  export let index
  export let isActive
  let isSubmitting = false

  async function press() {
    isSubmitting = true
    const submitMove = functions.httpsCallable('submitMove')
    await submitMove({ roomId: $currentRoom.room.id, columnIndex: index })
    isSubmitting = false
  }
</script>

<div class="level-item">
  <button class="button is-info" disabled={!(isActive && !isSubmitting)} on:click={press}>
    <span class="icon is-small">
      <i class="fas fa-chevron-down"></i>
    </span>
  </button>
</div>