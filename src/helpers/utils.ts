
import { get } from 'svelte/store';
import { userInfo, authorized, currentPage, usecaseSelected } from '@/store';	
import { init, getUserInfo } from '@helpers/auth';
import type { UsecaseItem } from '@/types/usecases';
import {
  saveUsecaseSelected,
  getSavedUsecase,
  startingLoginProcess,
  returningFromLogin,
} from '@/helpers/storage';
import {  } from '@/store';
import { nbgitpuller, pagesOrder } from '@/constants';


export function saveUsecaseAndLogin(uc: UsecaseItem) {
  startingLoginProcess(true);
  saveUsecaseSelected(uc);
  getUserInfo().then((user) => {
    if (!user || user.expired) {
      init();
    } else {
      authorized.set(true);
      userInfo.set(user);
    }
  });
}

export function justCheckIfAuthenticated() {
  getUserInfo().then((user) => {
    if (!user || user.expired) return;

    authorized.set(true);
    userInfo.set(user);

    // simulate the click after the login
    if (!returningFromLogin()) return;
    clickSavedUsecase();
  });
}

export function openPuller() {
  const uc = get(usecaseSelected);
  const pullerLink = `${nbgitpuller.BASE}${nbgitpuller.URL_PATH_BASE}${uc.path}`;
  window.open(pullerLink, '_blank');
}

function clickSavedUsecase() {
  const savedUc = getSavedUsecase();
  if (!savedUc) return;
  goNextPage();
}

export function goNextPage() {
  const currentPageName = get(currentPage);
  const pageIndex = pagesOrder.indexOf(currentPageName);
  if (pageIndex < (pagesOrder.length - 1)) {
    currentPage.set(pagesOrder[pageIndex + 1]);
  }
}
