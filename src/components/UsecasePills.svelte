
<script lang="ts">
  import pillsTooltips from '@/data/pills-tooltips.json';
  import type { UsecaseItem } from '@/types/usecases';
  
  export let usecaseItem: UsecaseItem;

  // TODO: improve this to call fewer times
  function getInfo(type: string, value: string) {
    const objInfo = pillsTooltips[type][value];
    return objInfo;
  }
  function getName(type: string, value: string) {
    const pillInfo = getInfo(type, value);
    return pillInfo.name;
  }
  function getTooltip(type: string, value: string) {
    const pillInfo = getInfo(type, value);
    return pillInfo.tooltip;
  }
</script>



<div class="pills">
  {#if usecaseItem.maturity?.length}
    {#each usecaseItem.maturity as maturityItem}
      <div class="maturity">
        <span title={getTooltip("maturity", maturityItem)}>
          { getName("maturity",  maturityItem) }
        </span>
      </div>
    {/each}
  {/if}
  {#if usecaseItem.access?.length}
    {#each usecaseItem.access as accessItem}
      <div class="access">
        <span title={getTooltip("access", accessItem)}>
          { getName("access",  accessItem) }
        </span>
      </div>
    {/each}
  {/if}
  {#if usecaseItem.experience?.length}
    {#each usecaseItem.experience as experienceItem}
      <div class="experience">
        <span title={getTooltip("experience", experienceItem)}>
          { getName("experience", experienceItem) }
        </span>
      </div>
    {/each}
  {/if}
</div>



<style>
  .pills {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-content: baseline;
    justify-content: flex-end;
  }
  .pills div {
    border-radius: 15px;
    padding: 10px;
    display: inline;
    margin: 5px;
    cursor: help;
  }
  .pills .maturity {
    background-color: #b7b7fa;
  }
  .pills .access {
    background-color: #ffffb3;
  }
  .pills .experience {
    background-color: #cfc;
  }
</style>
