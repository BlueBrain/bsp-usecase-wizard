
import { userInfo, authorized } from '@/store';	
import { init, getUserInfo } from '@helpers/auth';
import type { UsecaseItem } from '@/types/usecases';
import {
  saveUsecaseSelected,
  getSavedUsecase,
  startingLoginProcess,
  returningFromLogin,
} from '@/helpers/storage';
import { nbgitpuller } from '@/constants';


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

export function openPuller(uc: UsecaseItem) {
  const pullerLink = `${nbgitpuller.BASE}${nbgitpuller.URL_PATH_BASE}${uc.path}`;
  window.open(pullerLink, '_blank');
}

function clickSavedUsecase() {
  const savedUc = getSavedUsecase();
  if (!savedUc) return;
  openPuller(savedUc);
}
