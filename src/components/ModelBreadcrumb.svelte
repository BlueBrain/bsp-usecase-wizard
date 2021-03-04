
<script lang="ts">
  import type { Model } from '@/types/models';
  export let modelItem: Model;
</script>



<div class="model-breadcrumb-container">
  <ul class="arrows">
    {#each ['species', 'brain_region', 'cell_type', 'name'] as part}
      <li>{ modelItem[part] }</li>
    {/each}
  </ul>
</div>



<style>
  .arrows {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    font-size: 2em;
    margin: 0 0 20px 0;
  }
  .arrows li:before {
    content: " > ";
  }
  .arrows li:first-child:before {
    content: "";
  }
  .arrows li {
    padding: 5px;
    pointer-events: none;
    text-decoration: none;
    color: black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .arrows li:first-child {
    margin-left: 0px;
  }
</style>
