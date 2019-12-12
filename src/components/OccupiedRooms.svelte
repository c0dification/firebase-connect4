<script>
  import { derived } from 'svelte/store'
  import { db } from '../firebase'
  import { collectionData } from 'rxfire/firestore'
  import { startWith } from 'rxjs/operators'
  import { profile } from '../stores'
  import CreateRoom from './CreateRoom.svelte'
  import OccupiedRoom from './OccupiedRoom.svelte'

  const query = derived(profile, $profile => {
    return db.collection('rooms')
      .where('playerIds', 'array-contains', $profile.uid)
      .orderBy('updatedAt', 'desc')
  })
  const rooms = collectionData($query, 'id').pipe(startWith([]))
</script>

<h2 class="title">Your Rooms <span class="tag is-dark">{ $rooms.length }</span> <CreateRoom uid={ $profile.uid } /></h2>

{#if $rooms.length}
  <ul>
    {#each $rooms as room}
      <OccupiedRoom { room } />
    {/each}
  </ul>
{:else}
  <div class="is-size-5 has-text-centered">No rooms found</div>
{/if}
