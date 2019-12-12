<script>
  import { add } from '../data-actions'

  export let uid

  function addRoom() {
    add(uid)
  }
</script>

<span>
  <button class="button is-primary has-text-grey-dark" on:click={addRoom}>
    <span class="icon">
      <i class="fas fa-plus"></i>
    </span>
    <span>Create Room</span>
  </button>
</span>