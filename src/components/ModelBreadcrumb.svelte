
<script lang="ts">
  import type { Model } from '@/types/models';
  import { model } from '@/constants';
  export let modelItem: Model;

  function getProps() {
    // @ts-ignore
    return model.BREADCRUMB_PROPERTIES.map(prop => modelItem[prop])
  }
</script>



<div class="model-breadcrumb-container">
  <ul class="arrows">
    {#each getProps() as prop}
      <li>{ prop }</li>
    {/each}
  </ul>
</div>



<style>
  .arrows {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    font-size: 1.4em;
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
