import { writable } from 'svelte/store';
import type { UsecaseItem } from '@/types/usecases';


export const usecaseSelected = writable({} as UsecaseItem);

export const authorized = writable(false);

export const userInfo = writable({} as Oidc.User);
