
import axios from 'axios';
import { usecaseSelected, userInfo } from '@/store';
import { modelCatalog } from '@/constants';
import type { Model, ModelsJson, ModelsJsonInfo } from '@/types/models';

import { modelsSelected, usecaseCategorySelected, collabIdSelected } from '@/store';
import { get } from 'svelte/store';
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

export default {};
