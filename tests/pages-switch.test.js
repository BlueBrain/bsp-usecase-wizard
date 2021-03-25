
import { currentPage, usecaseSelected } from '@/store';
import { pages } from '@/constants';
import { get } from 'svelte/store';
import { goNextPage, goBackPage } from '@/helpers/pages';

// =================
// Testing next page
// =================
function setUcLink() {
  const ucMock = {
    title: 'test',
    externalUrl: 'https://test.com',
  };
  usecaseSelected.set(ucMock);
  window.open = () => {};
}

test('open new tab from use cases', () => {
  setUcLink();
  currentPage.set(pages.USECASE_SELECTION);
  goNextPage();
  const next = get(currentPage);
  // did not change due it only opened a new tab
  expect(next).toBe(pages.USECASE_SELECTION);
});

test('open new tab from models', () => {
  setUcLink();
  currentPage.set(pages.MODEL_SELECTION);
  goNextPage();
  const next = get(currentPage);
  expect(next).toBe(pages.MODEL_SELECTION);
});

test('not open new tab from collab', () => {
  setUcLink();
  currentPage.set(pages.COLLAB_SELECTION);
  goNextPage();
  const next = get(currentPage);
  expect(next).toBe(pages.COLLAB_SELECTION);
});



function setUcNotebook() {
  const ucMock = {
    title: 'test',
    notebookPath: '/notebooks',
  };
  usecaseSelected.set(ucMock);
}

test('change to collab from models', () => {
  setUcNotebook();
  currentPage.set(pages.MODEL_SELECTION);
  goNextPage();
  const next = get(currentPage);
  expect(next).toBe(pages.COLLAB_SELECTION);
});

test('change to collab from use cases', () => {
  setUcNotebook();
  currentPage.set(pages.USECASE_SELECTION);
  goNextPage();
  const next = get(currentPage);
  expect(next).toBe(pages.COLLAB_SELECTION);
});

test('not change to collab from collab', () => {
  setUcNotebook();
  currentPage.set(pages.COLLAB_SELECTION);
  goNextPage();
  const next = get(currentPage);
  expect(next).toBe(pages.COLLAB_SELECTION);
});



function setUcModel() {
  const ucMock = {
    title: 'test',
    chooseModel: true,
    notebookPath: '/notebooks',
  };
  usecaseSelected.set(ucMock);
}

test('not change to models from models', () => {
  setUcModel();
  currentPage.set(pages.MODEL_SELECTION);
  goNextPage();
  const next = get(currentPage);
  expect(next).toBe(pages.COLLAB_SELECTION);
});

test('change to models from use cases', () => {
  setUcModel();
  currentPage.set(pages.USECASE_SELECTION);
  goNextPage();
  const next = get(currentPage);
  expect(next).toBe(pages.MODEL_SELECTION);
});

test('not change to models from collab', () => {
  setUcModel();
  currentPage.set(pages.COLLAB_SELECTION);
  goNextPage();
  const next = get(currentPage);
  expect(next).toBe(pages.COLLAB_SELECTION);
});



// =================
// Testing back page
// =================
test('not go back from use cases', () => {
  setUcLink();
  currentPage.set(pages.USECASE_SELECTION);
  goBackPage();
  const back = get(currentPage);
  // did not change due it only opened a new tab
  expect(back).toBe(pages.USECASE_SELECTION);
});

test('not go back from models', () => {
  setUcLink();
  currentPage.set(pages.MODEL_SELECTION);
  goBackPage();
  const back = get(currentPage);
  expect(back).toBe(pages.MODEL_SELECTION);
});

test('not go back from collab', () => {
  setUcLink();
  currentPage.set(pages.COLLAB_SELECTION);
  goBackPage();
  const back = get(currentPage);
  expect(back).toBe(pages.COLLAB_SELECTION);
});



test('go to use cases from models', () => {
  setUcNotebook();
  currentPage.set(pages.MODEL_SELECTION);
  goBackPage();
  const back = get(currentPage);
  expect(back).toBe(pages.USECASE_SELECTION);
});

test('stay in use cases from use cases', () => {
  setUcNotebook();
  currentPage.set(pages.USECASE_SELECTION);
  goBackPage();
  const back = get(currentPage);
  expect(back).toBe(pages.USECASE_SELECTION);
});

test('go to use cases from collab', () => {
  setUcNotebook();
  currentPage.set(pages.COLLAB_SELECTION);
  goBackPage();
  const back = get(currentPage);
  expect(back).toBe(pages.USECASE_SELECTION);
});



test('go to use cases from models', () => {
  setUcModel();
  currentPage.set(pages.MODEL_SELECTION);
  goBackPage();
  const back = get(currentPage);
  expect(back).toBe(pages.USECASE_SELECTION);
});

test('stay in use cases from use cases', () => {
  setUcModel();
  currentPage.set(pages.USECASE_SELECTION);
  goBackPage();
  const back = get(currentPage);
  expect(back).toBe(pages.USECASE_SELECTION);
});

test('go to models from collab', () => {
  setUcModel();
  currentPage.set(pages.COLLAB_SELECTION);
  goBackPage();
  const back = get(currentPage);
  expect(back).toBe(pages.MODEL_SELECTION);
});
