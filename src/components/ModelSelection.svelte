
<script lang="ts">
  import Button, {Label, Icon} from '@smui/button';
  import Textfield from '@smui/textfield';
  import CircularProgress from '@smui/circular-progress';
  import { onMount, onDestroy } from 'svelte';

  import ModelCard from './ModelCard.svelte';
  import ModelShowSelectedToggle from './ModelShowSelectedToggle.svelte';

  import { userInfo, modelsSelected } from '@/store';
  import type { Model } from '@/types/models';
  import { getHippocampusModels } from '@/helpers/models';
  import { goNextPage, goBackPage } from '@/helpers/pages';
  import { model as modelConstants } from '@/constants';

  
  let modelsLoading = false;
  let fetchedModels: Array<Model> = [];
  let filteredModels: Array<Model> = [];
  let searchText = '';
  
  onMount(() => {
    load();
  });

  const unsubscribeUser = userInfo.subscribe((newUser: Oidc.User) => {
    if (!newUser?.access_token) return;
    load();
  });

  async function load() {
    modelsLoading = true;
    fetchedModels = await getHippocampusModels();
    modelsSelected.set([]);
    setFilteredModels(fetchedModels);
    modelsLoading = false;
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

	onDestroy(unsubscribeUser);
</script>



<section class="model-section-container">
  <div class="custom-section-header">
    <div class="go-back-btn">
      <Icon class="material-icons" on:click={goBackPage}>keyboard_backspace</Icon>
    </div>
    <h2 class="page-header-title">Please select the model(s)</h2>
  </div>

  {#if modelsLoading}
    <div class="centered">
      <div>Fetching latest models from Model Catalog...</div>
      <CircularProgress class="custom-loading-spin" indeterminate />
    </div>
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
  .models-container {
    max-height: 70vh;
    overflow: scroll;
    padding: 10px;
  }
  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: space-between;
  }
</style>
