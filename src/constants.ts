
export const storageKeys = {
  SAVED_URL: 'urlParam',
  SELECTED_USECASE: 'selectedUsecase',
  RETURN_LOGIN: 'returnFromLogin',
};

export const drive = {
  DRIVE_API_URL: 'https://drive.ebrains.eu/api2'
};

export const nbgitpuller = {
  BASE: 'https://lab.ebrains.eu/hub/user-redirect/git-pull?repo=https%3A%2F%2Fgithub.com%2Fantonelepfl%2Fusecases&branch=dev',
  URL_PATH_BASE: '&urlpath=lab%2Ftree%2Fusecases%2F',
};

export const pages = {
  USECASE_SELECTION: 'usecaseSelection',
  COLLAB_SELECTION: 'collabSelection',
  MODEL_SELECTION: 'modelSelection',
};

export const pagesOrder = [
  pages.USECASE_SELECTION,
  pages.COLLAB_SELECTION,
  pages.MODEL_SELECTION,
];
