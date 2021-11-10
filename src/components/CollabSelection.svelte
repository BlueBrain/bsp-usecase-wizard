
<script lang="ts">
  import Button, {Icon} from '@smui/button';
  import List, {Item, Text} from '@smui/list';
  import Textfield from '@smui/textfield';
  import {Label} from '@smui/common';
  import CircularProgress from '@smui/circular-progress';
  import { onDestroy } from 'svelte';

  import { userInfo, errorMessage } from '@/store';
  import { findMyCollabs } from '@/helpers/drive';
  import { generatePullerLink } from '@/helpers/utils';
  import { fileCreationProcess } from '@/helpers/collab';
  import { goBackPage } from '@/helpers/pages';
  import type { Collab as CollabInterface } from '@/types/interfaces';
  import { saveLastUsedCollab, getLastUsedCollab } from '@/helpers/storage';
  import PullerDialog from './PullerDialog.svelte';

  const limitCollabsToShow = 10;
  let processing = false;
  let collabsLoading = false;
  let collabSelectedName = '';
  let collabs: Array<CollabInterface> = []; // full collabs
  let filteredCollabsNames: Array<string> = [];
  let searchText = '';
  let lastUsedCollabName = '';
  let showDialog = false;
  let pullerUrl = '';
  
  const unsubscribeUser = userInfo.subscribe((newUser: Oidc.User) => {
    if (!newUser?.access_token) return;
    showMyCollabs();
    lastUsedCollabName = getLastUsedCollab();
  });

  async function createFiles() {
    processing = true;
    saveLastUsedCollab(collabSelectedName);
    fileCreationProcess(collabSelectedName)
      .then(() => {
        pullerUrl = generatePullerLink(collabSelectedName);
        const wasOpened = window.open(pullerUrl, '_blank');
        if (!wasOpened) showDialog = true;
      })
      .catch(showError)
      .finally(() => {
        processing = false;
        collabSelectedName = '';
      });
  }

  function setFilteredCollabs(collabs: Array<CollabInterface>, showPagination = false) {
    filteredCollabsNames = [];
    if (showPagination) {
      filteredCollabsNames = collabs
        .slice(0, limitCollabsToShow)
        .map(collab => collab.name);
      filteredCollabsNames.push('...');
      return filteredCollabsNames;
    }
    // show all when searching
    filteredCollabsNames = collabs.map(collab => collab.name);
  }

  async function showMyCollabs() {
    collabsLoading = true;
    collabs = (await findMyCollabs().catch(showError)) || [];
    collabsLoading = false;
    setFilteredCollabs(collabs, true);
  }

  function collabSelected(collabName: string) {
    if (collabName === '...') {
      // show all collabs
      setFilteredCollabs(collabs);
      return;
    }
    collabSelectedName = collabName;
  }

  function filterCollab() {
    const searchParam = searchText;
    if (searchParam === '') { // reset filter
      setFilteredCollabs(collabs, true);
      return;
    }
    const filteredCollabsNames =  collabs.filter((collab: CollabInterface) =>
      collab.name.toLowerCase().includes(searchParam.toLowerCase())
    );
    setFilteredCollabs(filteredCollabsNames);
  }

  function showError(e: any) {
    const message = JSON.stringify(e.response?.data || e.message);
    errorMessage.set(message);
  }

  function resetDialog() {
    showDialog = false;
    pullerUrl = '';
  }

  onDestroy(unsubscribeUser);
</script>



<section class="collab-section-container">
  <div class="custom-section-header">
    <div class="go-back-btn">
      <Icon class="material-icons" on:click={goBackPage}>keyboard_backspace</Icon>
    </div>
    <h2 class="page-header-title">Please select the destination Collab</h2>
  </div>
  <div class="search-container">
    {#if collabsLoading}
      <div class="centered">
        <div>Fetching Collabs...</div>
        <CircularProgress class="custom-loading-spin" indeterminate />
      </div>
    {/if}
    {#if !collabsLoading && collabs.length}
      <div class="top-bar">
        <div class="search-box">
          <Textfield
            style="width: 100%;"
            helperLine$style="width: 100%;"
            label="Collab Name"
            bind:value={searchText}
            on:change={filterCollab}
          >
            <Icon class="material-icons" slot="trailingIcon">search</Icon>
          </Textfield>
        </div>

        <div class="processing-container">
          <Button
            on:click={createFiles}
            disabled={processing || !collabSelectedName}
            color="secondary"
            variant="unelevated"
          >
            <Label>
              {#if processing}
                <div class="centered">
                  <div>Processing...</div>
                  <CircularProgress class="custom-loading-spin" indeterminate />
                </div>
              {:else}
                Use Collab
              {/if}
            </Label>
          </Button>
        </div>
      </div>

      <div class="last-used-collab">
        {#if lastUsedCollabName}
          <Item on:click={collabSelected(lastUsedCollabName)}>
            <Text><strong>Last used: </strong>{lastUsedCollabName}</Text>
          </Item>
        {/if}
      </div>
    {/if}
  </div>
  <div class="collab-list">
    {#if !collabsLoading && collabs.length}
      <div class="collab-list-scroll">
        <List>
          {#each filteredCollabsNames as collabName}
            <Item on:click={collabSelected(collabName)}>
              <Text>{collabName}</Text>
            </Item>
          {/each}
        </List>
      </div>
    {/if}
  </div>
  <PullerDialog
    pullerUrl="{ pullerUrl }"
    showDialog="{ showDialog }"
    on:reset={resetDialog}
  />
</section>



<style>
  .top-bar {
    display: grid;
    grid-template:
      "search . button" auto
      / 4fr 1fr 4fr;
  }
  .top-bar .search-box {
    grid-area: search;
    justify-self: center;
    width: 100%;
    margin-left: 22px;
  }
  .top-bar .processing-container {
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
  .collab-list-scroll {
    max-height: 70vh;
    overflow-y: scroll;
  }

  .collab-section-container {
    display: grid;
    grid-template:
      ". title ." auto
      ". search ." auto
      ". list ." auto
      / 4fr 8fr 4fr;
  }
  .collab-section-container .custom-section-header {
    grid-area: title;
  }
  .collab-section-container .search-container {
    grid-area: search;
  }
  .collab-section-container .collab-list {
    grid-area: list;
  }
  @media only screen and (max-width: 900px) {
    .collab-section-container {
      grid-template:
        "title" auto
        "search" auto
        "list" auto
        / 1fr;
    }
  }
</style>
