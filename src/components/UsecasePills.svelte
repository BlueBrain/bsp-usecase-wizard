
<script lang="ts">
  import pillsTooltips from '@/data/pills-tooltips.json';
  import type { UsecaseItem } from '@/types/usecases';
  import { Icon } from '@smui/button';
  
  export let usecaseItem: UsecaseItem;

  // TODO: improve this to call fewer times
  function getInfo(type: string, value: string) {
    // @ts-ignore
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
  function openTutorial(url: string) {
    window.open(url, '_blank');
  }
</script>



<div class="pills">
  <div class="column">
    {#if usecaseItem.maturity?.length}
      {#each usecaseItem.maturity as maturityItem}
        <div class="maturity colored">
          <span data-tooltip={getTooltip("maturity", maturityItem)} title={getTooltip("maturity", maturityItem)}>
            { getName("maturity",  maturityItem) }
          </span>
        </div>
      {/each}
    {/if}
    {#if usecaseItem.access?.length}
      {#each usecaseItem.access as accessItem}
        <div class="access colored">
          <span data-tooltip={getTooltip("access", accessItem)}>
            { getName("access",  accessItem) }
          </span>
        </div>
      {/each}
    {/if}
    {#if usecaseItem.experience?.length}
      {#each usecaseItem.experience as experienceItem}
        <div class="experience colored">
          <span data-tooltip={getTooltip("experience", experienceItem)}>
            { getName("experience", experienceItem) }
          </span>
        </div>
      {/each}
    {/if}
  </div>
  <div class="column">
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
    {#if usecaseItem.tutorial}
      <div
        class="video-tutorial"
        data-tooltip="See interactive tutorial"
        on:click|stopPropagation={ () => openTutorial(usecaseItem.tutorial) }
      >
        <div class="tutorial-icon">
          <Icon class="material-icons">tv</Icon>
        </div>
      </div>
    {/if}
  </div>
</div>



<style>
  .pills {
    display: flex;
    align-content: center;
    justify-content: flex-end;
  }
  .pills .colored {
    display: inline-flex;
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
    cursor: help;
    white-space: nowrap;
    align-self: center;
    font-size: 0.8em;
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
    width: 30px;
    height: 30px;
    background-size: 100% 90%;
    background-repeat: space;
  }
  .video-tutorial {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .column {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
