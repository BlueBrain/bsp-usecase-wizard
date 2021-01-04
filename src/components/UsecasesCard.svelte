
<script lang="ts">
  import Paper from '@smui/paper';
  import UsecasesPills from './UsecasesPills.svelte'
  import type { UsecaseItem } from '@/types/usecases';
  import { createEventDispatcher } from 'svelte';
  
  export let usecases: Array<UsecaseItem>;
  
  const dispatch = createEventDispatcher();

  function ucClick(usecaseItem: UsecaseItem) {
    console.log('ucClick');
    dispatch('clicked', { usecaseItem });
  }
</script>



<div class="usecases-card-container">
  {#each usecases as usecaseItem}
    {#if !usecaseItem.disabled}
      <div class="card-container">
        <Paper elevation="5" on:click={() => ucClick(usecaseItem)}>
          <div class="columns-container">
            <div class="image">
              <img src={ usecaseItem.picture.src } alt="">
            </div>

            <div class="text-content">
              <div class="title">{ usecaseItem.title }</div>
              
              <div class="description">{ usecaseItem.description }</div>
              
              {#if usecaseItem?.contributors?.length}
                <div class="contributors-container">
                  <span class="credit-title">Credits:</span>
                  {#each usecaseItem.contributors as contributor}
                    <span class="contributor-names">{ contributor.name } ({ contributor.email || "?" })</span>
                  {/each}
                </div>
              {/if}
            </div>
            <UsecasesPills {usecaseItem} />
          </div> <!-- columns-container -->
        </Paper>
      </div> <!-- end card -->
    {/if}
  {/each} <!-- end item -->
</div>



<style>
  .card-container {
    margin-bottom: 15px;
  }
  
  .columns-container {
    display: flex;
  }

  .image img {
    width: 215px;
    margin-right: 15px;
  }

  .text-content {
    width: 70%;
    flex-grow: 1;
    display: inline-grid;
    vertical-align: top;
  }
  .title {
    font-size: 1.8em;
  }
  .description {
    font-size: 1.2em;
    padding-top: 10px;
  }
  .contributors-container {
    padding-top: 10px;
    font-size: 0.8em;
  }
  .credit-title {
    font-weight: bold;
  }
  span.contributor-names:before {
    content: " - ";
  }
</style>
