
<script lang="ts">
  import Button from '@smui/button';
  import List, {Item, Text} from '@smui/list';
  import Textfield from '@smui/textfield';
  import {Label, Icon} from '@smui/common';

  import { userInfo } from '@/store';
  import {
    findCollabIdByName, uploadFromUrl,
    findMyCollabs,
  } from '@helpers/drive';
  import type { Collab as CollabInterface, CollabSelectionDataObj } from '@/types/interfaces';

  let userInfoStored: Oidc.User;
  export let labLink = '';
  export let processing = false;
  export let myCollabs: CollabSelectionDataObj = {
    loading: false,
    collabSelectedName: '',
    collabs: [], // full collabs
    filteredCollabs: [],
    searchText: '',
    parentFolder: 'example_drive',
  };
  
  userInfo.subscribe((newUser: Oidc.User) => {
    userInfoStored = newUser;
  });

  function copyToClipboard(text: string) {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  function copyToken() {
    copyToClipboard(userInfoStored.access_token);
  }

  async function createFiles() {
    processing = true;
    const parentFolder = myCollabs.parentFolder;
    const collabId = await findCollabIdByName(myCollabs.collabSelectedName);
    const promises = [
      uploadFromUrl({
        fileUrl: 'https://raw.githubusercontent.com/antonelepfl/usecases/dev/production_notebooks/circuitbuilding/Cell%20Placement%20Hippocampus.ipynb',
        collabId,
        parentFolder,
      }),
      uploadFromUrl({
        fileUrl: 'https://raw.githubusercontent.com/antonelepfl/usecases/dev/production_notebooks/morphology/Morphology%20Analysis.ipynb',
        collabId,
        parentFolder,
        placeholder: 'REPLACE_MORPHOLOGY_FILE_HERE',
        newText: '--------------',
      }),
      uploadFromUrl({
        fileUrl: 'https://raw.githubusercontent.com/antonelepfl/usecases/dev/production_notebooks/morphology/Morphology%20Analysis.ipynb',
        collabId,
        parentFolder,
        fileName: 'original-Morphology Analysis.ipynb',
      }),
    ]
    await Promise.all(promises);
    
    let destinationPath = '';
    let destinationFileName = 'Morphology Analysis.ipynb'; 
    if (myCollabs.collabSelectedName === 'My Library') {
      destinationPath = `My Libraries/My Library/${parentFolder}/${destinationFileName}`;
    } else {
      destinationPath = `Shared with groups/${myCollabs.collabSelectedName}/${parentFolder}/${destinationFileName}`;
    }
    labLink = `https://lab.ebrains.eu/user/GENERIC_USER/lab/workspaces/auto-q/tree/drive/${destinationPath}`;
    console.log(labLink);
    setTimeout(() => {
      // give time to drive to sync with jupyter lab
      processing = false;
    }, 3000);
  }

  async function showMyCollabs() {
    myCollabs.loading = true;
    const collabs = await findMyCollabs();
    myCollabs.loading = false;
    myCollabs.collabs = collabs;
    myCollabs.filteredCollabs = collabs;
  }

  function collabSelected(collabName: string) {
    myCollabs.collabSelectedName = collabName;
  }

  function filterCollab() {
    const searchParam = myCollabs.searchText;
    if (searchParam === '') { // reset filter
      myCollabs.filteredCollabs = myCollabs.collabs;
      return;
    }

    const filteredCollabs =  myCollabs.collabs.filter(
      (collab: CollabInterface) => collab.name.includes(searchParam)
    );
    console.log('filterCollab', filteredCollabs);
    myCollabs.filteredCollabs = filteredCollabs;
  }

</script>


<div>
  <Button
    on:click={copyToken}
    color={'secondary'}
    variant='raised'
  >
    <Label>Copy Token</Label>
  </Button>
</div>

<div>
  <!-- Select Collab -->
  <Button
    on:click={showMyCollabs}
    color={'secondary'}
    variant='raised'
  >
    <Label>Show My Collabs</Label>
  </Button>
  
  {#if myCollabs.loading}
    <span>Loading...</span>
  {/if}
  
  {#if !myCollabs.loading && myCollabs.collabs.length}
    <div class="search-box">
      <Textfield
        class="shaped-outlined"
        label="Search"
        bind:value={myCollabs.searchText}
        on:change={filterCollab}
      >
        <!-- <Icon class="material-icons">event</Icon> -->
      </Textfield>
    </div>

    <div>
      <List class="demo-list">
        {#each myCollabs.filteredCollabs as collab}
          <Item on:click={collabSelected(collab.name)}>
            <Text>{collab.name}</Text>
          </Item>
        {/each}
      </List>
    </div>
  {/if}
</div>

<div>
  <!-- Copy files in collab -->
  {#if myCollabs.collabSelectedName}
    <div>
      <Textfield
        label="Parent folder"
        class="shaped-outlined"
        bind:value={myCollabs.parentFolder}
      />
    </div>

    <Button
      on:click={createFiles}
      disabled={processing}
      color={'secondary'}
      variant='raised'
    >
      <Label>Create files</Label>
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
