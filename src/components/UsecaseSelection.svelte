
<script lang="ts">
  import { Icon } from '@smui/button';
  import UsecaseCard from './UsecaseCard.svelte';
  import UsecaseGroup from './UsecaseGroup.svelte';
  import Accordion from './Accordion.svelte';
  import { onMount } from 'svelte';

  import type {
    UsecasesFileInterface,
    UsecaseItem,
    UsecaseCategory,
  } from '@/types/usecases';
  import {
    authorized,
    usecaseSelected,
    usecaseCategorySelected,
    appVersion,
    generalMessage,
  } from '@/store';
  import { saveUsecaseAndLogin } from '@/helpers/utils';
  import { goNextPage } from '@/helpers/pages';
  import { usecases as usecasesConstants } from '@/constants';

  let usecasesCategories: UsecasesFileInterface = [];

  function ucClick(event: any) {
    const uc: UsecaseItem = event.detail.usecaseItem;
    usecaseSelected.set(uc);
    usecaseCategorySelected.set(event.detail.categoryId);
    
    if (uc.externalUrl && !uc.chooseModel) {
      // avoid auth for only external apps
      goNextPage();
      return;
    }
    if (!$authorized) {
      console.warn('user not registered');
      saveUsecaseAndLogin();
      return;
    }
    goNextPage();
  }

  function categoryIsNotEmpty(category: UsecaseCategory) {
    if (!category.usecases.length) {
      if (!category.groups.length) return false;

      return category.groups.some(
        group => group.items.some(ucInfo => !ucInfo.disabled)
      );
    }
    return category.usecases.some(ucInfo => !ucInfo.disabled);
  }

  function showExpanded(categoryTitle: string) {
    // if has anchor, expand this category
    const categoryAnchor = pruneTitleToAnchor(categoryTitle);
    return categoryAnchor === window.location.hash.replace(/^#/, '');
  }

  function pruneTitleToAnchor(categoryTitle: string) {
    return categoryTitle
      .replaceAll('-', '_')
      .replaceAll(' ', '_')
      .toLowerCase();
  }

  function fetchUsecasesInfoFile() {
    fetch(usecasesConstants.INFO_FILE_URL)
      .then(response => response.json())
      .then(info => {
        usecasesCategories = info.map((category: UsecaseCategory) => ({
          ...category,
          anchor: pruneTitleToAnchor(category.title),
          hasItems: categoryIsNotEmpty(category),
          isExpanded: showExpanded(category.title),
        }));
      });
  }

  function anchorClicked(event: Event, category: UsecaseCategory) {
    if (category.isExpanded) event.stopPropagation();

    generalMessage.set('Link copied');
    navigator.clipboard.writeText(window.location.href);
  }

  onMount(fetchUsecasesInfoFile);
</script>



<div class="usecase-list-item">
  <div class="usecase-list-content">
    {#each usecasesCategories as category}
      {#if category.hasItems}

        <Accordion bind:isExpanded={ category.isExpanded }>
          <div slot="header" class="custom-accordion-item">
            <div class="inline">{ category.title }</div>
            <a
              id={ category.anchor }
              title="Copy link to this category"
              class="category-anchor inline"
              href={ `#${category.anchor}` }
              on:click={ (event) => anchorClicked(event, category) }
            >
              <Icon class="material-icons">link</Icon>
            </a>
          </div>

          <div slot="content">
            <UsecaseCard
              usecases={ category.usecases }
              categoryId={ category.id }
              on:clicked={ ucClick }
            />
            {#if category.groups}
              <UsecaseGroup
                groups={ category.groups }
                categoryId={ category.id }
                on:clicked={ ucClick }
              />
            {/if}
          </div>
        </Accordion>

      {/if}
    {/each} <!-- end category -->
  </div>

  <div class="app-version">
    v{$appVersion}
  </div>
</div>


<style>
  .usecase-list-item {
    display: grid;
    grid-template:
      ". content ." auto
      ". version ." auto
      / 1fr 8fr 1fr;
  }
  .usecase-list-item .app-version {    
    background: #113548;
    color: white;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: version;
    font-size: 0.8em;
  }
  .usecase-list-item .usecase-list-content {
    grid-area: content;
  }
  :global(.usecase-list-item .category-anchor i) {
    font-size: 18px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .usecase-list-item .custom-accordion-item .inline {
    display: inline-block;
  }

  @media only screen and (max-width: 900px) {
    .usecase-list-item {
      grid-template:
        "content" auto
        "version" auto
        / 1fr;
    }
  }
</style>