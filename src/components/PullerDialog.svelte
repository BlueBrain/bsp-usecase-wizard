
<script lang="ts">
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import { createEventDispatcher } from 'svelte';

  export let pullerUrl: string;
  export let showDialog: Boolean;
  // this variable name is mandatory
  let open: any;

  $: {
    open = showDialog;
	}

  function manuallyOpenJupyterLab() {
    window.open(pullerUrl, '_blank');
    reset();
  }

  const dispatch = createEventDispatcher();

  function reset() {
    dispatch('reset');
  }
</script>



<div class="puller-dialog-container">
  <Dialog
    bind:open
    aria-labelledby="simple-title"
    aria-describedby="simple-content"
  >
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <Title id="simple-title">JupyterLab</Title>
    <Content id="simple-content">Open EBrains JupyterLab?</Content>
    <Actions>
      <Button on:click={reset}>
        <Label>Cancel</Label>
      </Button>
      <Button on:click={manuallyOpenJupyterLab} use={[InitialFocus]}>
        <Label>Open</Label>
      </Button>
    </Actions>
  </Dialog>
</div>
