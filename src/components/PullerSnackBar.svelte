
<script lang="ts">
  import Snackbar, { Actions, Label } from '@smui/snackbar';
  import Button from '@smui/button';

  export let pullerUrl: string;
  export let showSnackbar: Boolean;
  let snackbarBind: any;

  $: {
    if (showSnackbar) snackbarBind.open();
	}

  function manuallyOpenJupyterLab() {
    window.open(pullerUrl, '_blank');
  }
</script>



<div class="puller-snackbar-container">
  <Snackbar bind:this={snackbarBind}>
    <Label>Ready</Label>
    <Actions>
      <Button
        on:click={manuallyOpenJupyterLab}
        disabled={!pullerUrl}
        color="secondary"
        variant="unelevated"
      >Open Jupyter</Button>
    </Actions>
  </Snackbar>
</div>
