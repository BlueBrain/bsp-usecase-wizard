
import { get } from 'svelte/store';
import { pages } from '@/constants';
import { currentPage, usecaseSelected } from '@/store';
import type { UsecaseItem } from '@/types/usecases';

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
      console.warn('usecase does not have any next page');
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
      console.warn('usecase does not have any next page');
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
      console.warn('usecase does not have any previous page');
      break;
  
    case pages.MODEL_SELECTION:
      if (uc.notebookPath) {
        currentPage.set(pages.USECASE_SELECTION);
        return;
      }
      console.warn('usecase does not have any previous page');
      break;

    default:
      break;
  }
}
