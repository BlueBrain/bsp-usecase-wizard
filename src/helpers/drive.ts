
import axios, { AxiosResponse, AxiosPromise, AxiosError } from 'axios';
import { userInfo } from '@/stores';
import { drive } from '@/constants';

const { DRIVE_API_URL } = drive;

const axiosInstance = axios.create();

userInfo.subscribe((newUser: Oidc.User) => {
  axiosInstance.defaults.headers.Authorization = `Bearer ${newUser?.access_token}`;
});

export async function findCollabIdByName(collabName: string) {
  const endpoint = `${DRIVE_API_URL}/repos/`;
  const response = await axiosInstance.get(endpoint);
  console.log('findCollabIdByName', response);
}

export default {};

