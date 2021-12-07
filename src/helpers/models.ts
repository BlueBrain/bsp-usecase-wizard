
import { get } from 'svelte/store';
import {
  usecaseSelected, errorMessage, modelsSelected,
  usecaseCategorySelected, collabIdSelected,
} from '@/store';
import { modelCatalog } from '@/constants';
import type { Model, ModelsJson, ModelsJsonInfo } from '@/types/models';
import { getFileFromCollab, uploadString } from '@/helpers/drive';
import { drive } from '@/constants';
import type { UsecaseItem } from '@/types/usecases';
import { getAxiosInstance } from '@/helpers/http';

const PYTHON3_COMPATIBLE = 'optimizations_Python3';

const axiosInstance = getAxiosInstance();

function pruneModels(modelList: Array<Model>): Array<Model> {
  return modelList
    // remove models with no images
    .filter(m => m.images.length > 0)
    // select models python3 compatible
    .filter(m => {
      const instances = m.instances;
      if (!instances || !instances.length) return false;
      const lastInstance = instances[instances.length -1];
      const source = lastInstance.source;
      if (!source) return false;
      const isPy3Compatible = source.includes(PYTHON3_COMPATIBLE);
      if (!isPy3Compatible) return false;
      return true;
    });
}

export async function getHippocampusModels() {
  const { URL, HIPPOCAMPUS_QUERY} = modelCatalog;
  const response = await axiosInstance.get(URL + HIPPOCAMPUS_QUERY);
  const models: Array<Model> = response.data;
  const prunedModels = pruneModels(models);
  return prunedModels;
}

function getModelInfo(modelItem: Model): ModelsJsonInfo {
  return {
    id: modelItem.id,
    date: (new Date()).toLocaleDateString(),
    name: modelItem.name,
    uri: modelItem.uri,
  };
}

function getModelArray(
  newModelsInfo: Array<ModelsJsonInfo>,
  oldSubContent: Array<ModelsJsonInfo>,
): Array<ModelsJsonInfo> {
  [ ...oldSubContent , ...newModelsInfo ]
  const finalModelArray = [];
  oldSubContent.forEach(oldModel => {
    // remove duplicate
    const isPresent = newModelsInfo.some(nm => nm.id === oldModel.id);
    if (!isPresent) finalModelArray.push(oldModel);
  });
  finalModelArray.push(...newModelsInfo);
  return finalModelArray;
}

function appendModels(originalObj: ModelsJson, newModelsInfo: Array<ModelsJsonInfo>) {
  const categoryKey = get(usecaseCategorySelected);
  const uc: UsecaseItem = get(usecaseSelected);
  const oldSubContent = originalObj?.[categoryKey]?.[uc.id] || [];
  const newModelsArray = getModelArray(newModelsInfo, oldSubContent);
  const newModelsObj = Object.assign(
    {},
    originalObj,
    {
      [categoryKey]: { [uc.id]: newModelsArray }
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
  const BLUE_NAAS_KEY = 'bluenaas=true';
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

  const trimmedSourcePath = modelInfo?.instances.reduce((prev, instance) => {
    // this way we obtain the latest source available in the instances
    const source = instance?.source;
    if (!source) return prev;
    if (!source.includes(BLUE_NAAS_KEY)) return prev;
    const trimmed = source.replace(/^.+AUTH_.+?\//, '');
    if (!trimmed) return prev;
    return prev = trimmed;
  }, '');

  return placeholderUrl
    .replace('{EXTERNAL_URL}', uc.externalUrl)
    .replace('{TRIMMED_SOURCE_PATH}', trimmedSourcePath)
    .replace('{MORPHOLOGY_URL}', modelMorphologyUrl);
}

export function openWebAppWithModel(uc: UsecaseItem) {
  const placeholder = uc.externalUrlModelPlaceholder || uc.externalUrl;
  const fullUrl = fillModelUrl(placeholder, uc);
  if (!fullUrl) return;
  const wasOpened = window.open(fullUrl, '_blank');
  if (!wasOpened) errorMessage.set('Popup was blocked');;
}

export default {};
