
<script lang="ts">
  import Button, {Label} from '@smui/button';
  import { userInfo } from '@/store';
  import { findCollabIdByName, uploadFromUrl } from '@helpers/drive';

  let userInfoStored: Oidc.User;
  
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

  async function init() {
    const collabId = await findCollabIdByName('My Library');
    const parentFolder = '/foo2';
    const FILE_TO_UPLOAD = 'https://raw.githubusercontent.com/antonelepfl/usecases/dev/production_notebooks/morphology/Morphology%20Analysis.ipynb';
    await uploadFromUrl({
      fileUrl: FILE_TO_UPLOAD,
      collabId,
      parentFolder,
    });
  }
  init();
</script>



<Button
  on:click={copyToken}
  color={'secondary'}
  variant='raised'
>
  <Label>Token</Label>
</Button>
