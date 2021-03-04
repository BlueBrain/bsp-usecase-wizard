
<script lang="ts">
  import { modelsSelected } from '@/store';
  let showModelsSelected: boolean = true;
</script>



<div class="container">
  <div
    class="
      models-selected-container
      {showModelsSelected ? 'expanded' : 'collapsed'}
      {$modelsSelected.length ? 'visible' : 'hide-toggle'}
    "
  >
    <div class="models-accordion" on:click={() => showModelsSelected = !showModelsSelected}>
      <div>{ showModelsSelected ? 'Hide' : 'Show' } Models Selected</div>
    </div>
    {#each $modelsSelected as modelItem}
    <p>{ modelItem.name }</p>
    {/each}
  </div>
</div>



<style>
  .models-selected-container {
    margin: 10px 0;
    cursor: pointer;
    border: 1px solid;
    border-radius: 5px;
    padding: 15px;
  }
  .models-selected-container .models-accordion {
    text-align: center;
    font-size: 30px;
    border-radius: 5px;
  }
  .models-selected-container.expanded {
    max-height: 400px;
    transition: max-height 0.3s ease-out;
  }
  .models-selected-container.collapsed {
    max-height: 35px;
    transition: max-height 0.3s ease-out;
    height:auto;
    overflow: hidden;
  }
  .models-selected-container.hide-toggle {
    display: none;
  }
</style>
