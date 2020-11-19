
import { storage } from '../constants';

function saveUrl(url: string) {
  sessionStorage.setItem(storage.SAVED_URL, url);

}

function getSavedUrl(): string {
  return sessionStorage.getItem(storage.SAVED_URL);
}

export {
  saveUrl,
  getSavedUrl,
};

export default {};
