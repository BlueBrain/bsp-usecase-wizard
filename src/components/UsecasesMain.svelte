
<script lang="ts">
  import type { UsecaseFileInterface, UsecaseItem } from '@/types/usecases';
  import usecases from '@/data/usecases-info.json';
  
  import UsecasesCard from './UsecasesCard.svelte';
  import { authorized, usecaseSelected } from '@/store';
  import {
    saveUsecaseAndLogin,
    goNextPage,
  } from '@/helpers/utils';

  function ucClick(event: any) {
    const uc: UsecaseItem = event.detail.usecaseItem;
    if (uc.path) {
      usecaseSelected.set(uc);
      
      if (!$authorized) {
        console.warn('user not registered');
        saveUsecaseAndLogin(uc);
        return;
      }

      goNextPage();

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
