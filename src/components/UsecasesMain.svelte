
<script lang="ts">
  import type { UsecaseFileInterface, UsecaseItem } from '@/types/usecases';
  import usecases from '@/data/usecases-info.json';
  
  import UsecasesCard from './UsecasesCard.svelte';
  import {
    authorized,
    usecaseSelected,
    usecaseCategorySelected,
  } from '@/store';
  import { saveUsecaseAndLogin } from '@helpers/utils';
  import { goNextPage } from '@helpers/pages';

  function ucClick(event: any) {
    const uc: UsecaseItem = event.detail.usecaseItem;
    usecaseSelected.set(uc);
    usecaseCategorySelected.set(event.detail.category);
    
    if (!$authorized) {
      console.warn('user not registered');
      saveUsecaseAndLogin(uc);
      return;
    }
    goNextPage();
  }

  function categoryIsNotEmpty(usecases: Array<UsecaseItem>) {
    return usecases.some(ucInfo => !ucInfo.disabled);
  }

  export const usecasesCategories: Array<UsecaseFileInterface> = usecases;

</script>



<div class="usecase-list-item">
  <h2 class="page-header-title">Please select a Use Case</h2>

  {#each usecasesCategories as category}
    {#if categoryIsNotEmpty(category.usecases)}
      <div class="category">{ category.title }</div>
      <UsecasesCard
        usecases={ category.usecases }
        category={ category.id }
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
