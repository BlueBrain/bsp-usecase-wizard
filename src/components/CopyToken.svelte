
<script lang="ts">
  import Button, {Label} from '@smui/button';
  import { userInfo } from '@/store';
  import { findCollabIdByName, uploadFromUrl } from '@helpers/drive';

  let userInfoStored: Oidc.User;
  export let labLink = '';
  export let processing = false;
  
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
    const collabId = await findCollabIdByName('My Library');
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
    labLink = `https://lab.ebrains.eu/user/GENERIC_USER/lab/tree/drive/My%20Libraries/My%20Library${parentFolder}/Morphology%20Analysis.ipynb`;
    processing = false;
  }
</script>



<Button
  on:click={copyToken}
  color={'secondary'}
  variant='raised'
>
  <Label>Copy Token</Label>
</Button>


<Button
  on:click={createFiles}
  disabled={processing}
  color={'secondary'}
  variant='raised'
>
  <Label>Create files</Label>
</Button>

{#if processing}
  <span>processing...</span>
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
