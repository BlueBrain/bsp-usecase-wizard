
<script lang="ts">
  import Button, {Label} from '@smui/button';
  import List, {Item, Text} from '@smui/list';
  import { userInfo } from '@/store';
  import { findCollabIdByName, uploadFromUrl, findMyCollabs } from '@helpers/drive';
  import type { Collab as CollabInterface } from '@/types/interfaces';

  interface CollabSelectionDataObj {
    loading: boolean;
    collabs: Array<CollabInterface>;
    collabSelectedName: string;
  }

  let userInfoStored: Oidc.User;
  export let labLink = '';
  export let processing = false;
  export let myCollabs: CollabSelectionDataObj = {
    loading: false,
    collabSelectedName: '',
    collabs: [],
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
    const parentFolder = '/example_drive';
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
    ]
    await Promise.all(promises);
    
    let destinationPath = '';
    let destinationFileName = 'Morphology Analysis.ipynb'; 
    if (myCollabs.collabSelectedName === 'My Library') {
      destinationPath = `drive/My Libraries/My Library/${parentFolder}/${destinationFileName}`;
    } else {
      destinationPath = `drive/Shared with groups/${myCollabs.collabSelectedName}/${parentFolder}/${destinationFileName}`;
    }
    destinationPath = encodeURIComponent(destinationPath);
    labLink = `https://lab.ebrains.eu/user/GENERIC_USER/lab/tree/${destinationPath}`;
    processing = false;
  }

  async function showMyCollabs() {
    myCollabs.loading = true;
    const collabs = await findMyCollabs();
    myCollabs.loading = false;
    myCollabs.collabs = collabs;
  }
  function collabSelected(collabName: string) {
    myCollabs.collabSelectedName = collabName;
  }
</script>



<Button
  on:click={copyToken}
  color={'secondary'}
  variant='raised'
>
  <Label>Copy Token</Label>
</Button>

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
    <List class="demo-list">
      {#each myCollabs.collabs as collab}
        <Item on:click={collabSelected(collab.name)}>
          <Text>{collab.name}</Text>
        </Item>
      {/each}
    </List>
  {/if}
</div>

<div>
  <!-- Copy files in collab -->
  {#if myCollabs.collabSelectedName}
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

    {#if labLink}
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
