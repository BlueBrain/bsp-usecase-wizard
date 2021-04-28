
<script lang="ts">
  import { onMount } from 'svelte';
  import { justCheckIfAuthenticated } from '@/helpers/utils';
  import { fade } from 'svelte/transition';
  import UsecaseSelection from './components/UsecaseSelection.svelte';
  import CollabSelection from './components/CollabSelection.svelte';
  import ModelSelection from './components/ModelSelection.svelte';
  import GenericSnackBar from './components/GenericSnackBar.svelte';
  import { currentPage } from '@/store';
  import { pages } from '@/constants';

  onMount(() => {
    justCheckIfAuthenticated();
  });

</script>



<main>
  {#if $currentPage === pages.USECASE_SELECTION}
    <div transition:fade>
      <UsecaseSelection />
    </div>
  {/if}

  {#if $currentPage === pages.COLLAB_SELECTION}
    <div transition:fade>
      <CollabSelection />
    </div>
  {/if}

  {#if $currentPage === pages.MODEL_SELECTION}
    <div transition:fade>
      <ModelSelection />
    </div>
  {/if}

  <!-- To display messages -->
  <GenericSnackBar />
</main>



<style>
  main {
    margin: 0 auto;
    min-height: 60vh;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
