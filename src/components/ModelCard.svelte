
<script lang="ts">
  import Paper from '@smui/paper';
  import { onDestroy } from 'svelte';

  import ModelBreadcrumb from './ModelBreadcrumb.svelte'

  import type { Model } from '@/types/models';
  import { modelsSelected } from '@/store';
  
  export let modelItem: Model;
  let modelIsSelected: boolean = false;

  const unsubscribeModels = modelsSelected.subscribe(() => {
    modelIsSelected = $modelsSelected.some(
      model => model.name.includes(modelItem.name)
    )
  });

  function toggleModel(modelItem: Model) {
    if (modelIsSelected) {
      $modelsSelected = $modelsSelected.filter(
        model => model.name !== modelItem.name
      );
    } else {
      $modelsSelected = [...$modelsSelected, modelItem];
    }
  }

  function ucClick(modelItem: Model) {
    toggleModel(modelItem);
  }

  function sanitize(rawHtml: string) {
    return rawHtml.replaceAll('\\_', '_');
  }

  onDestroy(unsubscribeModels);
</script>



<div class="models-card-container">
    
  <div class="card-container { modelIsSelected ? 'is-selected' : '' }">
    <Paper elevation="5" on:click={() => ucClick(modelItem)}>

      <div class="breadcrumbs">
        <ModelBreadcrumb modelItem={ modelItem } />
      </div>


      <div class="columns-container">
        <div class="img-container">
          {#each modelItem.images as image}
            <div class="image">
              <img
                loading="lazy"
                src={ image.url }
                alt={ image.caption }
              >
            </div>
          {/each}
        </div>

        <div class="text-content">
          <div class="description">{ @html sanitize(modelItem.description) }</div>
          
          {#if modelItem.author.length}
            <div class="contributors-container">
              <span class="credit-title">Credits:</span>
              {#each modelItem.author as author}
                <span class="contributor-names">{ author.given_name } { author.family_name }</span>
              {/each}
            </div>
          {/if}
        </div>

      </div> <!-- columns-container -->

    </Paper>
  </div> <!-- end card -->
</div>



<style>
  .models-card-container {
    margin-bottom: 15px;
  }
  
  .columns-container {
    display: flex;
  }

  .img-container {
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
  .description {
    font-size: 1em;
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

  :global(.card-container.is-selected div.smui-paper) {
    background-color: #e2eeff;
  }

  @media only screen and (max-width: 900px) {
    .columns-container {
      flex-direction: column;
    }
  }
</style>
