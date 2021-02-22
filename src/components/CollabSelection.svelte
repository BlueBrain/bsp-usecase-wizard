
<script lang="ts">
  import Button from '@smui/button';
  import List, {Item, Text} from '@smui/list';
  import Textfield from '@smui/textfield';
  import {Label, Icon} from '@smui/common';

  import { userInfo } from '@/store';
  import { findCollabIdByName, findMyCollabs, uploadString } from '@helpers/drive';
  import { openPuller } from '@helpers/utils';
  import type { Collab as CollabInterface } from '@/types/interfaces';
  import { drive } from '@/constants';

  const limitCollabsToShow = 10;
  let labLink = '';
  let processing = false;
  let collabsLoading = false;
  let collabSelectedName = '';
  let collabs: Array<CollabInterface> = []; // full collabs
  let filteredCollabsNames: Array<string> = [];
  let searchText = '';
  const parentFolder = drive.DEFAULT_FOLDER_NAME;
  
  userInfo.subscribe((newUser: Oidc.User) => {
    if (!newUser?.access_token) return;
    showMyCollabs();
  });

  async function createFiles() {
    processing = true;
    const collabId = await findCollabIdByName(collabSelectedName);
    const promises = [
      uploadString({
        fileName: 'test_file.txt',
        text: 'This is a test of the content',
        collabId,
        parentFolder,
      }),
    ]
    await Promise.all(promises);
    
    openPuller();

    processing = false;
    collabSelectedName = '';
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
    collabs = await findMyCollabs();
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

</script>


<section class="container">
  <div class="collab-list">
    <!-- Select Collab -->
    {#if collabsLoading}
      <span>Loading...</span>
    {/if}
    
    {#if !collabsLoading && collabs.length}
      <div class="search-box">
        <h3 class="search-label">Search Collab</h3>
        <Textfield
          class="shaped-outlined"
          variant="outlined"
          label="Collab Name"
          bind:value={searchText}
          on:change={filterCollab}
        />
      </div>

      <div>
        <List class="list-item">
          {#each filteredCollabsNames as collabName}
            <Item on:click={collabSelected(collabName)}>
              <Text>{collabName}</Text>
            </Item>
          {/each}
        </List>
      </div>
    {/if}
  </div>

  <div class="processing-container">
    <!-- Copy files in collab -->
    {#if collabSelectedName && !labLink}

      <Button
        on:click={createFiles}
        disabled={processing}
        color={'secondary'}
        variant='raised'
      >
        <Label>Use Collab</Label>
      </Button>

      {#if processing}
        <span>Processing...</span>
      {/if}

      {#if !processing && labLink}
        <a href="{labLink}" target="_blank">
          <Button
            color={'primary'}
            variant='raised'
          >
            <Label>Open Jupyter Lab</Label>
          </Button>
        </a>
      {/if}
    {/if}
  </div>
</section>


<style>
  .collab-list, .processing-container {
    max-width: 50%;
    margin: 20px auto;
  }

  .collab-list .search-box {
    display: flex;
    align-items: center;
  }
  .collab-list .search-box .search-label {
    margin-right: 10px;
    display: inline-block;
  }

  * :global(.shaped-outlined .mdc-text-field__input) {
    padding-top: 20px;
    padding-right: 16px;
    padding-bottom: 6px;
    padding-left: 16px;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__leading) {
    border-radius: 28px 0 0 28px;
    width: 28px;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__trailing) {
    border-radius: 0 28px 28px 0;
  }
</style>
