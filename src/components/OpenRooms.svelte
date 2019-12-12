<script>
  import { derived } from 'svelte/store'
  import { db } from '../firebase'
  import { collectionData } from 'rxfire/firestore'
  import { map, startWith } from 'rxjs/operators'
  import { profile } from '../stores'
  import OpenRoom from './OpenRoom.svelte'

  const query = derived(profile, $profile => db.collection('rooms').where('status', '==', 'pending').orderBy('updatedAt', 'desc'))
  const rooms = collectionData($query, 'id').pipe(
      startWith([]),
      map(rooms => rooms.filter(room => room.createdBy !== $profile.uid))
    )
</script>

<h2 class="title">Open Rooms <span class="tag is-dark">{ $rooms.length }</span></h2>

{#if $rooms.length}
  <ul>
    {#each $rooms as room}
      <OpenRoom { room } />
    {/each}
  </ul>
{:else}
  <div class="is-size-5 has-text-centered">No open rooms to join</div>
{/if}
