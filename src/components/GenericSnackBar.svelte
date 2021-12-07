
<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Snackbar, { Label } from '@smui/snackbar';
  import { errorMessage, generalMessage } from '@/store';

  let message: string;
  let snackbarBind: any;

  function showMessage(
    msg: string,
    originator: Writable<string>,
    prefix: string = ''
  ) {
    if (msg === '') return;
    message = `${prefix} ${msg}`;
    snackbarBind.open();
    setTimeout(() => { originator.set(''); }, 5000);
  }

  errorMessage.subscribe(msg => {
    showMessage(msg, errorMessage, 'Error:');
  });

  generalMessage.subscribe(msg => {
    showMessage(msg, generalMessage);
  });
</script>



<div class="generic-snackbar-container">
  <Snackbar bind:this={snackbarBind}>
    <Label>{message}</Label>
  </Snackbar>
</div>
