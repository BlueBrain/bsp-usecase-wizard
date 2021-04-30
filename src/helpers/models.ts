
import axios from 'axios';
import { get } from 'svelte/store';
import {
  usecaseSelected, userInfo, errorMessage,
  modelsSelected, usecaseCategorySelected, collabIdSelected,
} from '@/store';
import { modelCatalog } from '@/constants';
import type { Model, ModelsJson, ModelsJsonInfo } from '@/types/models';
import { getFileFromCollab, uploadString } from '@/helpers/drive';
import { drive } from '@/constants';
import type { UsecaseItem } from '@/types/usecases';

const axiosInstance = axios.create();

userInfo.subscribe((newUser: Oidc.User) => {
  axiosInstance.defaults.headers.Authorization = `Bearer ${newUser?.access_token}`;
});

export async function getHippocampusModels() {
  const { URL, HIPPOCAMPUS_QUERY} = modelCatalog;
  const response = await axiosInstance.get(URL + HIPPOCAMPUS_QUERY);
  const models: Array<Model> = response.data;
  return models;
}

function getModelInfo(modelItem: Model): ModelsJsonInfo {
  return {
    id: modelItem.id,
    date: (new Date()).toLocaleDateString(),
    name: modelItem.name,
    uri: modelItem.uri,
  };
}


function appendModels(originalObj: ModelsJson, newModelsInfo: Array<ModelsJsonInfo>) {
  const categoryKey = get(usecaseCategorySelected);
  const uc: UsecaseItem = get(usecaseSelected);
  const oldSubContent = originalObj?.[categoryKey]?.[uc.id] || [];
  const newModelsObj = Object.assign(
    {},
    originalObj,
    {
      [categoryKey]: {
        [uc.id]: [ ...oldSubContent , ...newModelsInfo ],
      }
    },
  );
  return newModelsObj;
}

async function uploadModel(modelsObj: ModelsJson) {
  const collabId = get(collabIdSelected);
  await uploadString({
    collabId,
    fileName: drive.DEFAULT_MODEL_FILE_NAME,
    stringContent: JSON.stringify(modelsObj),
    parentFolder: drive.DEFAULT_MODEL_FOLDER_NAME,
  })
}

export async function updateOrCreateModelsJson() {
  const collabId = get(collabIdSelected);
  const modelsFilePath = `/${drive.DEFAULT_MODEL_FOLDER_NAME}/${drive.DEFAULT_MODEL_FILE_NAME}`;
  const fileContent = await getFileFromCollab(collabId, modelsFilePath);

  let originalModelsObj;
  if (fileContent) {
    try {
      originalModelsObj = JSON.parse(fileContent);
    } catch (error) {
      console.error(error);
      originalModelsObj = {};
    }
  } else {
    originalModelsObj = {};
  }

  const models: Array<Model> = get(modelsSelected);
  const modelsInfo = models.map(m => getModelInfo(m));
  const finalModelsJson = appendModels(originalModelsObj, modelsInfo);
  await uploadModel(finalModelsJson);
}

function fillModelUrl(placeholderUrl: string, uc: UsecaseItem) {
  if (uc.maxModelSelection !== 1) {
    errorMessage.set('Multiple models in URL not supported yet');
    return null;
  }

  const modelInfo = get(modelsSelected)[0];
  const modelName = modelInfo.name;
  
  const modelMorphologyUrl = modelInfo?.instances.reduce((prev, instance) => {
    // this way we obtain the latest morphology available in the instances
    if (!instance.morphology) return prev;
    return prev = instance.morphology;
  }, '');

  if (placeholderUrl.includes('MORPHOLOGY_URL') && !modelMorphologyUrl) {
    errorMessage.set('Model do not have any morphology file associated');
    return null;
  }

  return placeholderUrl
    .replace('{EXTERNAL_URL}', uc.externalUrl)
    .replace('{MODEL_NAME}', modelName)
    .replace('{MORPHOLOGY_URL}', modelMorphologyUrl);
}

export function openWebAppWithModel(uc: UsecaseItem) {
  const placeholder = uc.externalUrlModelPlaceholder || uc.externalUrl;
  const fullUrl = fillModelUrl(placeholder, uc);
  if (!fullUrl) return;
  window.open(fullUrl, '_blank');
}

export default {};
