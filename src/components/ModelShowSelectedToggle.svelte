
<script lang="ts">
  import Paper from '@smui/paper';

  import { modelsSelected } from '@/store';

  import { defaultElevationObj } from '@/constants';
</script>



<div class="models-selected-container {$modelsSelected.length ? '' : 'hidden-section'}">
  <Paper {...defaultElevationObj}>
    <span class="title">Model(s) selected ({$modelsSelected.length}):</span>
    {#each $modelsSelected as modelItem}
      <span class="model">{ modelItem.name }</span>
    {/each}
  </Paper>
</div>



<style>
  .models-selected-container {
    padding: 15px 10px;
  }
  .models-selected-container span.title {
    font-size: 16px;
  }
  .models-selected-container span.model {
    font-size: 12px;
  }
  .models-selected-container span.model::after {
    content: ", ";
  }
  
  .models-selected-container.hidden-section {
    display: none;
  }
</style>
