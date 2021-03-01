
import axios from 'axios';
import { userInfo } from '@/store';
import { modelCatalog } from '@/constants';
import type { Model } from '@/types/models';

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

export default {};
