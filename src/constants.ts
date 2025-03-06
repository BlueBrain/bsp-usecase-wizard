
export const storageKeys = {
  SAVED_URL: 'urlParam',
  SELECTED_USECASE: 'selectedUsecase',
  RETURN_LOGIN: 'returnFromLogin',
  MODELS_LIST: 'modelsList',
  SELECTED_COLLAB: 'selectedCollab',
  SELECTED_CATEGORY: 'selectedCategory',
};

export const iam = {
  LOGIN_URL: 'https://iam.ebrains.eu/auth/realms/hbp',
};

export const drive = {
  CORS_PROXY: 'https://corsproxy.apps.tc.humanbrainproject.eu/',
  DRIVE_API_URL: 'https://drive.ebrains.eu/api2',
  DEFAULT_UC_FOLDER_NAME: 'CLS-INTERACTIVE-UC',
  DEFAULT_MODEL_FOLDER_NAME: 'CLS-INTERACTIVE-MODELS',
  DEFAULT_MODEL_FILE_NAME: 'models.json',
};

export const nbgitpuller = {
  BASE: 'https://lab.ebrains.eu/hub/user-redirect/git-pull?depth=0',
  REPO_KEY: '&repo=',
  URL_PATH_KEY: '&urlpath=lab/tree',
  TARGET_PATH_KEY: '&targetPath=/opt/app-root/src',
};

export const pages = {
  USECASE_SELECTION: 'usecaseSelection',
  COLLAB_SELECTION: 'collabSelection',
  MODEL_SELECTION: 'modelSelection',
};

export const modelCatalog = {
  URL: 'https://validation.brainsimulation.eu/models/',
  HIPPOCAMPUS_QUERY: '?model_scope=single%20cell&species=Rattus%20norvegicus&format=bluepyopt&size=300',
};

export const model = {
  BREADCRUMB_PROPERTIES: ['species', 'brain_region', 'cell_type', 'name'],
};

// fetch different usecases-info based on isProduction
const usecaseInfoBaseUrl = 'https://raw.githubusercontent.com/ebrains-cls-interactive/usecases-info';
declare const processEnvs: any; // comes from rollup.config.js
declare const jest: any;
const isProduction = (typeof jest !== 'undefined') ? false : processEnvs.isProduction;
const usecaseInfoBranch = isProduction ? 'main' : 'develop';

export const usecases = {
  INFO_FILE_URL: `${usecaseInfoBaseUrl}/${usecaseInfoBranch}/usecases-info.json`,
  JSON_SCHEMA_URL: `${usecaseInfoBaseUrl}/${usecaseInfoBranch}/usecases-info.schema.json`,
  STATISTIC_URL: 'https://docs.google.com/forms/u/1/d/e/1FAIpQLSeLKkgcY1yDb9gHjmFY-Ys8YH65wVhubdGfXUgudrRVIDtlqQ/formResponse',
};
