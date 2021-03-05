
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
  function getImplementationIconUrl(type: string, value: string) {
    const pillInfo = getInfo(type, value);
    return pillInfo.icon;
  }
</script>



<div class="pills">
  {#if usecaseItem.maturity?.length}
    {#each usecaseItem.maturity as maturityItem}
      <div class="maturity">
        <span data-tooltip={getTooltip("maturity", maturityItem)} title={getTooltip("maturity", maturityItem)}>
          { getName("maturity",  maturityItem) }
        </span>
      </div>
    {/each}
  {/if}
  {#if usecaseItem.access?.length}
    {#each usecaseItem.access as accessItem}
      <div class="access">
        <span data-tooltip={getTooltip("access", accessItem)}>
          { getName("access",  accessItem) }
        </span>
      </div>
    {/each}
  {/if}
  {#if usecaseItem.experience?.length}
    {#each usecaseItem.experience as experienceItem}
      <div class="experience">
        <span data-tooltip={getTooltip("experience", experienceItem)}>
          { getName("experience", experienceItem) }
        </span>
      </div>
    {/each}
  {/if}
  {#if usecaseItem.implementation}
    <div class="implementation">
      <span data-tooltip={getTooltip("implementation", usecaseItem.implementation)}>
        <div
          class="uc-implementation"
          style="background-image: url({getImplementationIconUrl('implementation', usecaseItem.implementation)});"
        />
      </span>
    </div>
  {/if}
</div>



<style>
  .pills {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-end;
  }
  .pills > div {
    border-radius: 15px;
    padding: 10px;
    margin: 5px;
    cursor: help;
    white-space: nowrap;
    align-self: center;
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
  .uc-implementation {
    width: 50px;
    height: 50px;
    background-size: 100% 90%;
    background-repeat: space;
  }
</style>
