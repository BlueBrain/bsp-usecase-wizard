
import { saveUrl, getSavedUrl } from '@/helpers/storage';
import { iam } from '@/constants';

test('url is saved and load', () => {
  const url = iam.LOGIN_URL;
  saveUrl(url);
  const loadedUrl = getSavedUrl();
  expect(url).toBe(loadedUrl);
});



test('url save and load hash too', () => {
  const url = `iam.LOGIN_URL#test1=1&test2=2`;
  saveUrl(url);
  const loadedUrl = getSavedUrl();
  expect(url).toBe(loadedUrl);
});
