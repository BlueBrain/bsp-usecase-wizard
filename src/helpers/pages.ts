
import { get } from 'svelte/store';
import { pages } from '@/constants';
import { currentPage, usecaseSelected } from '@/store';
import type { UsecaseItem } from '@/types/usecases';

// TODO: fix assigning type based on property
// @ts-ignore ts(2339)

export function goNextPage() {
  const uc: UsecaseItem = get(usecaseSelected);
  switch (get(currentPage)) {
    case pages.USECASE_SELECTION:
      if (uc.chooseModel) {
        currentPage.set(pages.MODEL_SELECTION);
        return;
      }
      if (uc.notebookPath) {
        currentPage.set(pages.COLLAB_SELECTION);
        return;
      }
      if (uc.externalUrl) {
        window.open(uc.externalUrl, '_blank');
        return;
      }
      break;
  
    case pages.MODEL_SELECTION:
      if (uc.notebookPath) {
        currentPage.set(pages.COLLAB_SELECTION);
        return;
      }
      if (uc.externalUrl) {
        window.open(uc.externalUrl, '_blank');
        return;
      }
      break;

    default:
      break;
  }
}

export function goBackPage() {
  const uc: UsecaseItem = get(usecaseSelected);
  switch (get(currentPage)) {
    case pages.COLLAB_SELECTION:
      if (uc.chooseModel) {
        currentPage.set(pages.MODEL_SELECTION);
        return;
      }
      if (uc.notebookPath) {
        currentPage.set(pages.USECASE_SELECTION);
        return;
      }
      break;
  
    case pages.MODEL_SELECTION:
      if (uc.notebookPath) {
        currentPage.set(pages.USECASE_SELECTION);
        return;
      }
      break;

    default:
      break;
  }
}
