
<script lang="ts">
  import { onMount } from 'svelte';
  import { justCheckIfAuthenticated } from '@/helpers/utils';
  import { fade } from 'svelte/transition';
  import UsecasesMain from './components/UsecasesMain.svelte';
  import { currentPage } from '@/store';
  import { pages } from '@/constants';

  onMount(() => {
    justCheckIfAuthenticated();
  });
</script>



<main>
  {#if $currentPage === pages.USECASE_SELECTION}
    <div transition:fade>
      <UsecasesMain />
    </div>
  {/if}

  {#if $currentPage === pages.COLLAB_SELECTION}
    <div transition:fade>
      <h2>Collab Selection Page</h2>
    </div>
  {/if}

  {#if $currentPage === pages.MODEL_SELECTION}
    <div transition:fade>
      <h2>Model Selection Page</h2>
    </div>
  {/if}

</main>



<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
