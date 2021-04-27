
import { modelsSelected, collabIdSelected } from '@/store';
import { get } from 'svelte/store';
import type { Model } from '@/types/models';
import { findCollabIdByName, createFolder } from '@/helpers/drive';
import { updateOrCreateModelsJson } from '@/helpers/models';
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
