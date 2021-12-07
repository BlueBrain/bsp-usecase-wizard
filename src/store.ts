
import { readable, writable } from 'svelte/store';
import type { UsecaseItem } from '@/types/usecases';
import type { Model } from '@/types/models';
import { pages } from '@/constants';


export const usecaseSelected = writable({} as UsecaseItem);

export const usecaseCategorySelected = writable('');

export const authorized = writable(false);

export const userInfo = writable({} as Oidc.User);

type Pages = typeof pages.USECASE_SELECTION
  | typeof pages.COLLAB_SELECTION
  | typeof pages.MODEL_SELECTION;
const initialPage: Pages = pages.USECASE_SELECTION;
export const currentPage = writable(initialPage)

export const modelsSelected = writable([] as Array<Model>);

export const collabIdSelected = writable('');

// comes from rollup.config.js
declare var processEnvs: any
export const appVersion = readable(null, function start(set) {
  set(processEnvs.appVersion);
	return function stop() {};
});

export const modelsSelectedLimit = writable(0);

export const errorMessage = writable('');

export const generalMessage = writable('');
