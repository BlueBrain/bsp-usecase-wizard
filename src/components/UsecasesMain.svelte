
<script lang="ts">
  import type { UsecaseFileInterface, UsecaseItem } from '@/types/usecases';
  import usecases from '@/data/usecases-info.json';
  import { nbgitpuller } from '@/constants';
  import UsecasesCard from './UsecasesCard.svelte';

  function ucClick(event: any) {
    const uc: UsecaseItem = event.detail.usecaseItem;
    if (uc.path) {
      console.log('nbgitpuller', nbgitpuller);
      const pullerLink = `${nbgitpuller.BASE}${nbgitpuller.URL_PATH_BASE}${uc.path}`;
      console.log('pullerLink', pullerLink);
      console.log(uc.path);
      window.open(pullerLink, '_blank');
    } else if (uc.url) {
      window.open(uc.url, '_blank');
    } else {
      console.warn('usecase does not have url nor path');
    }
  }

  function categoryIsNotEmpty(usecases: Array<UsecaseItem>) {
    return usecases.some(ucInfo => !ucInfo.disabled);
  }

  export const usecasesCategories: Array<UsecaseFileInterface> = usecases;
</script>



<div class="usecase-list-item">
  {#each usecasesCategories as category}
    {#if categoryIsNotEmpty(category.usecases)}
      <div class="category">{ category.title }</div>
      <UsecasesCard
        usecases={ category.usecases }
        on:clicked={ ucClick }
      />
    {/if}
  {/each} <!-- end category -->
</div>



<style>
  .category {
    font-size: 3em;
    display: inline-block;
    padding: 20px;
  }
</style>
