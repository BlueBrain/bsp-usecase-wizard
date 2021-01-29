import { writable } from 'svelte/store';
import type { UsecaseItem } from '@/types/usecases';
import { pages } from '@/constants';


export const usecaseSelected = writable({} as UsecaseItem);

export const authorized = writable(false);

export const userInfo = writable({} as Oidc.User);

type Pages = typeof pages.USECASE_SELECTION
  | typeof pages.COLLAB_SELECTION
  | typeof pages.MODEL_SELECTION;
const initialPage: Pages = pages.USECASE_SELECTION;
export const currentPage = writable(initialPage)
