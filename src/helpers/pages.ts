
import { get } from 'svelte/store';
import { pages } from '@/constants';
import {
  currentPage,
  usecaseSelected,
  modelsSelected,
  modelsSelectedLimit,
} from '@/store';
import type { UsecaseItem } from '@/types/usecases';
import { sendStatistics } from '@/helpers/statistics';
import { openWebAppWithModel } from '@/helpers/models';

export function goNextPage() {
  const uc: UsecaseItem = get(usecaseSelected);
  switch (get(currentPage)) {
    case pages.USECASE_SELECTION:
      if (uc.chooseModel) {
        currentPage.set(pages.MODEL_SELECTION);
        if (!uc.maxModelSelection) return;
        modelsSelectedLimit.set(uc.maxModelSelection);
        return;
      }
      if (uc.notebookPath) {
        currentPage.set(pages.COLLAB_SELECTION);
        return;
      }
      if (uc.externalUrl) {
        sendStatistics();
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
        openWebAppWithModel(uc);
        sendStatistics();
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
      if (uc.notebookPath || uc.externalUrl) {
        currentPage.set(pages.USECASE_SELECTION);
        return;
      }
      break;

    default:
      break;
  }
}
