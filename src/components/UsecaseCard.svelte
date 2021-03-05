
<script lang="ts">
  import Paper from '@smui/paper';
  import { Icon } from '@smui/button';
  import { createEventDispatcher } from 'svelte';

  import UsecasePills from './UsecasePills.svelte'

  import type { UsecaseItem } from '@/types/usecases';
  
  export let usecases: Array<UsecaseItem>;
  export let category: string;
  
  const dispatch = createEventDispatcher();

  function ucClick(usecaseItem: UsecaseItem) {
    dispatch('clicked', { usecaseItem, category });
  }
  
  function openTutorial(url: string) {
    window.open(url, '_blank');
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

            <UsecasePills {usecaseItem} />

            {#if usecaseItem.tutorial}
              <div
                class="video-tutorial"
                on:click|stopPropagation={ () => openTutorial(usecaseItem.tutorial) }
              >
                <div class="tutorial-icon">
                  <Icon class="material-icons">tv</Icon>
                </div>
                <div class="tutorial-text">
                  Interactive tutorial
                </div>
              </div>
            {/if}
          </div> <!-- columns-container -->
        </Paper>
      </div> <!-- end card -->
    {/if}
  {/each} <!-- end item -->
</div>



<style>
  .card-container {
    margin-bottom: 15px;
    cursor: pointer;
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
  .video-tutorial {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
