
import axios from 'axios';
import { get } from 'svelte/store';
import {
  modelsSelected,
  collabIdSelected,
  usecaseCategorySelected,
  userInfo,
  usecaseSelected,
} from '@/store';
import { usecases } from '@/constants';

const STATISTICS_FORM_URL = usecases.STATISTIC_URL;

export interface StatisticDataInterface {
  category: string;
  usecase: string;
  userId: string;
  models?: Array<string>;
  collabId?: string;
}

export function sendStatistics() {
  // avoid sending outside production or in test
  // @ts-ignore // is testing
  if (typeof jest !== 'undefined') return;
  // @ts-ignore // comes from rollup.config.js
  declare const processEnvs: any;
  if (processEnvs?.baseUrl !== '/static/wizard') return;
  
  const formData = new URLSearchParams();
  const data: StatisticDataInterface = {
    category: get(usecaseCategorySelected),
    usecase: get(usecaseSelected)?.id,
    userId: get(userInfo)?.profile?.sub,
    models: get(modelsSelected)?.map(m => m.id),
    collabId: get(collabIdSelected),
  }
  
  formData.append('entry.2065854000', data.category);
  formData.append('entry.1219332324', data.usecase);
  formData.append('entry.2088231351', data.models.toString());
  formData.append('entry.748800890', data.collabId);
  formData.append('entry.1933333390', data.userId);

  const send = () => {
    axios({
      method: 'post',
      url: STATISTICS_FORM_URL,
      data: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch((e) => {
      console.error(e);
    });
  };
  send();
}
