
<script lang="ts">
  import { onMount } from 'svelte';
  import { userInfo } from '@/store';	
  import { init, getUserInfo } from '@helpers/auth';
  import CopyToken from './components/CopyToken.svelte';
  
  export let loadingAuth: boolean;
  
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

</main>



<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
