
<script lang="ts">
  import Button, {Label, Icon} from '@smui/button';
  import Textfield from '@smui/textfield';
  import { onMount } from 'svelte';

  import ModelCard from './ModelCard.svelte';
  import ModelShowSelectedToggle from './ModelShowSelectedToggle.svelte';

  import { userInfo, modelsSelected } from '@/store';
  import type { Model } from '@/types/models';
  import { saveModels, getModels } from '@/helpers/storage';
  import { getHippocampusModels } from '@/helpers/models';
  import { goNextPage } from '@/helpers/pages';

  
  let modelsLoading = false;
  let fetchedModels: Array<Model> = [];
  let filteredModels: Array<Model> = [];
  let searchText = '';
  
  onMount(() => {
    load();
  });

  userInfo.subscribe((newUser: Oidc.User) => {
    if (!newUser?.access_token) return;
    load();
  });

  async function load(force = false) {
    modelsLoading = true;
    
    let models: Array<Model> = [];

    const modelsCached = getModels();
    if (modelsCached && !force) {
      models = modelsCached;
    } else {
      models = await getHippocampusModels();
      saveModels(models);
    }
    
    fetchedModels = models;
    modelsLoading = false;
    setFilteredModels(models);
  }

  function filterModel() {
    if (searchText === '') { // reset filter
      setFilteredModels(fetchedModels);
      return;
    }
    const filteredModels =  fetchedModels.filter((model: Model) =>
      model.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredModels(filteredModels);
  }

  function setFilteredModels(models: Array<Model>) {
    filteredModels = models;
  }

  function forceFetchModels() {
    load(true);
  }
</script>



<section class="model-section-container">
  <div class="custom-section-header">
    <div class="go-back-btn">
      <Icon class="material-icons" on:click={goBackPage}>keyboard_backspace</Icon>
    </div>
    <h2 class="page-header-title">Please select the model(s)</h2>
  </div>

  {#if modelsLoading}
    <span>Fetching latest models from Model Catalog ...</span>
  {/if}

  {#if !modelsLoading && fetchedModels.length}
    <div class="top-bar">
      <div class="search-box">
        <div class="search-label">Search</div>
        <Textfield
          class="shaped-outlined custom-search"
          variant="outlined"
          label="Model Name"
          bind:value={searchText}
          on:change={filterModel}
        />
        <div class="filtered-length">
          { filteredModels.length } / { fetchedModels.length }
        </div>
      </div>

      <div class="force-fetch">
        <Button
          on:click={forceFetchModels}
          color="primary"
          variant="unelevated"
        >
          <Icon class="material-icons">refresh</Icon>
          <Label>Refresh</Label>
        </Button>
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

    <div class="models-container">
      {#each filteredModels as modelItem}
        <ModelCard modelItem={modelItem} />
      {/each}
    </div>

    <ModelShowSelectedToggle />
  {/if}
</section>



<style>
  .search-box {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }
  .search-label {
    font-size: 20px;
    margin-right: 20px;
  }
  .filtered-length {
    margin-left: 20px;
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .force-fetch, .continue-button {
    margin: 0 10px;
  }
  .models-container {
    max-height: 70vh;
    overflow: scroll;
    padding: 10px;
  }
</style>
