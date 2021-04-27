
import { get } from 'svelte/store';
import {
  userInfo,
  authorized,
  usecaseSelected,
  usecaseCategorySelected,
} from '@/store';	
import { init, getUserInfo } from '@/helpers/auth';
import { goNextPage } from '@/helpers/pages';
import type { UsecaseItem } from '@/types/usecases';
import {
  saveUsecaseSelected,
  getSavedUsecase,
  startingLoginProcess,
  returningFromLogin,
  saveCategorySelected,
  getSavedCategory,
} from '@/helpers/storage';
import {  } from '@/store';
import { nbgitpuller, drive } from '@/constants';


export function saveUsecaseAndLogin() {
  startingLoginProcess(true);
  saveUsecaseSelected(get(usecaseSelected));
  saveCategorySelected(get(usecaseCategorySelected));
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

function getRepoName(repoUrl: string) {
  // if has branch take the first part only
  const url = repoUrl.includes('&') ? repoUrl.split('&')[0] : repoUrl;
  const name = url.split('/').pop();
  const result = decodeURIComponent(name);
  return result;
}

export function openPuller(collabName: string) {
  // TODO: fix assigning type based on property
  const uc = get(usecaseSelected);

  // @ts-ignore
  const repoName = getRepoName(uc.notebookRepoUrl);
  // @ts-ignore
  const repoUrl = `${nbgitpuller.REPO_KEY}${uc.notebookRepoUrl}`;
  const collabPath = collabName === 'My Library' ? 'drive/My Libraries/My Library' : `shared/${collabName}`;
  const filePath = `${collabPath}/${drive.DEFAULT_UC_FOLDER_NAME}/${repoName}`;
  const targetPath = `${nbgitpuller.TARGET_PATH_KEY}/${filePath}`;
  // @ts-ignore
  const urlPath = `${nbgitpuller.URL_PATH_KEY}/${filePath}/${uc.notebookPath}`;

  const pullerLink = `${nbgitpuller.BASE}${repoUrl}${targetPath}${urlPath}`;
  console.debug('PullerLink:', pullerLink);
  window.open(pullerLink, '_blank');
  return pullerLink;
}

function clickSavedUsecase() {
  const savedUc = getSavedUsecase();
  const savedCategory = getSavedCategory();
  if (!savedUc) return;
  usecaseSelected.set(savedUc);
  usecaseCategorySelected.set(savedCategory);
  goNextPage();
}
