
<script lang="ts">
  import UsecaseCard from './UsecaseCard.svelte';
  import Accordion from './Accordion.svelte';

  import usecases from '@/data/usecases-info.json';
  import type { UsecaseFileInterface, UsecaseItem } from '@/types/usecases';
  import { authorized, usecaseSelected, usecaseCategorySelected } from '@/store';
  import { saveUsecaseAndLogin } from '@/helpers/utils';
  import { goNextPage } from '@/helpers/pages';

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
  {#each usecasesCategories as category}
    {#if categoryIsNotEmpty(category.usecases)}

      <Accordion>
        <div slot="header">
          <span>{ category.title }</span>
        </div>

        <div slot="content">
          <UsecaseCard
            usecases={ category.usecases }
            category={ category.id }
            on:clicked={ ucClick }
          />
        </div>
      </Accordion>

    {/if}
  {/each} <!-- end category -->
</div>
