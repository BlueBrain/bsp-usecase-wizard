
import axios from 'axios';

import { userInfo } from '@/store';

const axiosInstance = axios.create();

userInfo.subscribe((newUser: Oidc.User) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${newUser?.access_token}`;
});

export function getAxiosInstance() {
  return axiosInstance;
}
