
<script lang="ts">
  import { onMount } from 'svelte';
  import { userInfo } from '@/store';	
  import { init, getUserInfo } from '@helpers/auth';
  import CopyToken from './components/CopyToken.svelte';
  import UsecasesMain from './components/UsecasesMain.svelte';
  
  let loadingAuth = true;
  
  let username = '';

  onMount(() => {
    getUserInfo().then((user) => {
      if (!user || user.expired) {
        init();
      } else {
        userInfo.set(user);
        username = user?.profile?.name;
        loadingAuth = false;
      }
    });
  });
</script>



<main>
  {#if loadingAuth}
    <h1>loading...</h1>
  {:else}
    <h1>Welcome {username}!</h1>
    <CopyToken></CopyToken>
  {/if}

  <UsecasesMain />
</main>



<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }

  main h1 {
    text-align: center;
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
