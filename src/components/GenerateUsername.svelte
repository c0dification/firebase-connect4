<script>
  import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'
  import { db } from '../firebase'

  export let uid 
  
  function newName() {
    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, animals], length: 2 })
      .split('_').map(word => word.slice(0,1).toUpperCase() + word.slice(1)).join(' ')
    db.collection('players').doc(uid).update({ username: randomName })
  }
</script>

<div class="level-item">
  <button class="button is-warning" on:click={newName}>
    <span class="icon">
      <i class="fas fa-pencil-alt"></i>
    </span>
    <span>New Username</span>
  </button>
</div>