
import {
  modelsSelected, usecaseCategorySelected, collabIdSelected,
} from '@/store';
import { get } from 'svelte/store';
import type { Model, ModelsJson, ModelsJsonInfo } from '@/types/models';
import {
  findCollabIdByName, getFileFromCollab, uploadString, createFolder,
} from '@/helpers/drive';
import { drive } from '@/constants';

export async function fileCreationProcess(collabSelectedName: string) {
  // creation of folder for git repo and if models, create model folder and model.json
  const collabId = await findCollabIdByName(collabSelectedName);
  collabIdSelected.set(collabId);

  const models: Array<Model> = get(modelsSelected);
  if (models.length) {
    // has models, create folder and file
    await updateOrCreateModelsJson();
  }
  // create folder where the nbgitpuller will put the git repo
  await createFolder(collabId, drive.DEFAULT_UC_FOLDER_NAME);
}

function getModelInfo(modelItem: Model): ModelsJsonInfo {
  return {
    id: modelItem.id,
    date: (new Date()).toLocaleDateString(),
    name: modelItem.name,
  };
}

function appendModels(originalObj: ModelsJson, newModelsInfo: Array<ModelsJsonInfo>) {
  const categoryKey = get(usecaseCategorySelected);
  const newModelsObj = Object.assign(
    {},
    originalObj,
    { [categoryKey]: [ ...(originalObj[categoryKey] || []) , ...newModelsInfo ] },
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

async function updateOrCreateModelsJson() {
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
