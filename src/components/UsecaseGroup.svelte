
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import UsecaseCard from './UsecaseCard.svelte';

  import type { UsecaseGroup } from '@/types/usecases';
  
  export let groups: Array<UsecaseGroup>;
  export let categoryId: string;
  
  const dispatch = createEventDispatcher();

  function ucClick(event: any) {
    dispatch('clicked', event.detail);
  }
</script>



<div class="usecases-group-container">
  {#each groups as group}
    <h2>{ group.title }</h2>
    <UsecaseCard
      usecases={ group.items }
      categoryId={ categoryId }
      on:clicked={ ucClick }
    />
  {/each} <!-- end group -->
</div>
