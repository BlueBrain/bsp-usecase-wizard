
<script lang="ts">
  import Button, {Label, Icon} from '@smui/button';
  import Textfield from '@smui/textfield';
  import CircularProgress from '@smui/circular-progress';
  import { onMount } from 'svelte';

  import ModelCard from './ModelCard.svelte';
  import ModelShowSelectedToggle from './ModelShowSelectedToggle.svelte';

  import { modelsSelected, errorMessage } from '@/store';
  import type { Model } from '@/types/models';
  import { getHippocampusModels } from '@/helpers/models';
  import { goNextPage, goBackPage } from '@/helpers/pages';
  import { model as modelConstants } from '@/constants';

  
  let modelsLoading = false;
  let fetchedModels: Array<Model> = [];
  let filteredModels: Array<Model> = [];
  let searchText = '';
  
  onMount(() => {
    load()
      .catch(errorMessage.set)
      .finally(() => modelsLoading = false);
  });

  async function load() {
    modelsLoading = true;
    fetchedModels = await getHippocampusModels();
    modelsSelected.set([]);
    setFilteredModels(fetchedModels);
  }

  function filterModel() {
    if (searchText === '') { // reset filter
      setFilteredModels(fetchedModels);
      return;
    }
    const filteredModels =  fetchedModels.filter((model: Model) => {
      const nameFound = model.name.toLowerCase().includes(searchText.toLowerCase());
      if (nameFound) return true;

      const propsFound = modelConstants.BREADCRUMB_PROPERTIES.some(prop => {
        // @ts-ignore
        if (!model[prop]) return false;
        // @ts-ignore
        return model[prop].toLowerCase().includes(searchText.toLowerCase());
      });

      if (propsFound) return true;

      return false;
    });
    setFilteredModels(filteredModels);
  }

  function setFilteredModels(models: Array<Model>) {
    filteredModels = models;
  }
</script>



<section class="model-section-container">
  <div class="custom-section-header">
    <div class="go-back-btn">
      <Icon class="material-icons" on:click={goBackPage}>keyboard_backspace</Icon>
    </div>
    <h2 class="page-header-title">Please select the model(s)</h2>
  </div>

  <div class="search-container">
    {#if modelsLoading}
      <div class="centered">
        <div>Fetching latest models from Model Catalog...</div>
        <CircularProgress class="custom-loading-spin" indeterminate />
      </div>
    {/if}

    {#if !modelsLoading && fetchedModels.length}
      <div class="top-bar">
        <div class="search-box">
          <Textfield
            style="width: 100%;"
            helperLine$style="width: 100%;"
            label="Model Name"
            bind:value={searchText}
            on:change={filterModel}
          >
            <Icon class="material-icons" slot="trailingIcon">search</Icon>
          </Textfield>
          <div class="filtered-length">
            ({ filteredModels.length } / { fetchedModels.length })
          </div>
        </div>
      
        <div class="continue-button">
          <Button
            on:click={goNextPage}
            color="secondary"
            variant="unelevated"
            disabled={ !$modelsSelected.length }
          >
            <Icon class="material-icons">arrow_forward_ios</Icon>
            <Label>Continue</Label>
          </Button>
        </div>
      </div>
    {/if}
  </div>

  <div class="model-list">
    {#if !modelsLoading && fetchedModels.length}
      {#each filteredModels as modelItem}
        <ModelCard modelItem={modelItem} />
      {/each}
    {/if}
  </div>

  <div class="models-selected-info">
    <ModelShowSelectedToggle />
  </div>

</section>



<style>
  .filtered-length {
    margin-left: 20px;
    display: inline-flex;
    white-space: pre;
  }
  .top-bar {
    display: grid;
    grid-template:
      "search . button" auto
      / 4fr 1fr 4fr;
  }
  .top-bar .search-box {
    display: flex;
    align-items: center;
    flex-grow: 1;
    grid-area: search;
    justify-self: center;
    width: 100%;
    margin-left: 22px;
  }
  .top-bar .continue-button {
    grid-area: button;
    justify-self: center;
    align-self: center;
  }

  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: space-between;
  }

  .model-section-container {
    display: grid;
    grid-template:
      ". title ." auto
      ". search ." auto
      ". list ." auto
      ". selected ." auto
      / 1fr 8fr 1fr;
  }
  .model-section-container .custom-section-header {
    grid-area: title;
  }
  .model-section-container .search-container {
    grid-area: search;
  }
  .model-section-container .model-list {
    grid-area: list;
    max-height: 70vh;
    overflow: scroll;
    padding: 10px;
  }
  .model-section-container .models-selected-info {
    grid-area: selected;
  }
  @media only screen and (max-width: 900px) {
    .model-section-container {
      grid-template:
        "title" auto
        "search" auto
        "list" auto
        "selected" auto
        / 1fr;
    }
  }
</style>
