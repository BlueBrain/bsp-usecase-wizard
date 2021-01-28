
<script lang="ts">
  import { onMount } from 'svelte';
  import UsecasesMain from './components/UsecasesMain.svelte';
  import { justCheckIfAuthenticated } from '@/helpers/utils';

  onMount(() => {
    justCheckIfAuthenticated();
  });
</script>



<main>
  <UsecasesMain />
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
