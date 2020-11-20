const { saveUrl, getSavedUrl } = require('../src/helpers/storage');

test('url is saved and load', () => {
  const url = 'https://jestjs.io/docs/en/getting-started#using-typescript';
  saveUrl(url);
  const loadedUrl = getSavedUrl();
  expect(url).toBe(loadedUrl);
});