
import { get } from 'svelte/store';
import { userInfo, authorized, usecaseSelected } from '@/store';	
import { init, getUserInfo } from '@/helpers/auth';
import { goNextPage } from '@/helpers/pages';
import type { UsecaseItem } from '@/types/usecases';
import {
  saveUsecaseSelected,
  getSavedUsecase,
  startingLoginProcess,
  returningFromLogin,
} from '@/helpers/storage';
import {  } from '@/store';
import { nbgitpuller, drive } from '@/constants';


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

export function openPuller(collabName: string) {
  // TODO: fix assigning type based on property
  const uc = get(usecaseSelected);

  // @ts-ignore
  const repo = `${nbgitpuller.REPO_KEY}${uc.notebookRepoUrl}`;
  const collabPath = collabName === 'My Library' ? 'drive/My Libraries/My Library' : `shared/${collabName}`;
  const targetPath = `${nbgitpuller.TARGET_PATH_KEY}/${collabPath}/${drive.DEFAULT_UC_FOLDER_NAME}`;
  // @ts-ignore
  const urlPath = `${nbgitpuller.URL_PATH_KEY}/${collabPath}/${drive.DEFAULT_UC_FOLDER_NAME}/${uc.notebookPath}`;

  const pullerLink = `${nbgitpuller.BASE}${repo}${targetPath}${urlPath}`;
  console.debug('PullerLink:', pullerLink);
  window.open(pullerLink, '_blank');
  return pullerLink;
}

function clickSavedUsecase() {
  const savedUc = getSavedUsecase();
  if (!savedUc) return;
  usecaseSelected.set(savedUc);
  goNextPage();
}
