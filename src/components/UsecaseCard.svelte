
<script lang="ts">
  import Paper from '@smui/paper';
  import { createEventDispatcher } from 'svelte';

  import UsecasePills from './UsecasePills.svelte'

  import type { UsecaseItem } from '@/types/usecases';
  import { defaultElevationObj } from '@/constants';
  
  export let usecases: Array<UsecaseItem>;
  export let categoryId: string;
  
  const dispatch = createEventDispatcher();

  function ucClick(usecaseItem: UsecaseItem) {
    dispatch('clicked', { usecaseItem, categoryId });
  }
</script>



<div class="usecases-card-container">
  {#each usecases as usecaseItem}
    {#if !usecaseItem.disabled}
      <div class="card-container">
        <Paper {...defaultElevationObj} on:click={() => ucClick(usecaseItem)}>
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
    font-size: 1.4em;
    font-weight: 500;
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
