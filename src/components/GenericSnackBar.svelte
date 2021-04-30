
<script lang="ts">
  import Snackbar, { Label } from '@smui/snackbar';
  import { errorMessage } from '@/store';

  let message: string;
  let snackbarBind: any;

  errorMessage.subscribe(msg => {
    if (msg === '') return;

    message = msg;
    snackbarBind.open();

    setTimeout(() => { errorMessage.set(''); }, 5000);
  });
</script>



<div class="generic-snackbar-container">
  <Snackbar bind:this={snackbarBind}>
    <Label>{message}</Label>
  </Snackbar>
</div>
