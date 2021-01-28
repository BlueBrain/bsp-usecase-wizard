
import { storageKeys } from '@/constants';
import type { UsecaseItem } from '@/types/usecases';

export function saveUrl(url: string) {
  sessionStorage.setItem(storageKeys.SAVED_URL, url);
}
export function getSavedUrl(): string {
  return sessionStorage.getItem(storageKeys.SAVED_URL);
}

export function saveUsecaseSelected(uc: UsecaseItem) {
  sessionStorage.setItem(storageKeys.SELECTED_USECASE, JSON.stringify(uc));
}
export function getSavedUsecase(): UsecaseItem | null {
  const value = sessionStorage.getItem(storageKeys.SELECTED_USECASE);
  if (!value) return null;
  return JSON.parse(value);
}

export function startingLoginProcess(value: boolean) {
  sessionStorage.setItem(storageKeys.RETURN_LOGIN, `${value}`);
}
export function returningFromLogin(): boolean {
  const value = sessionStorage.getItem(storageKeys.RETURN_LOGIN);
  startingLoginProcess(false);
  return value === 'false' ? false : true;
}

export default {};
