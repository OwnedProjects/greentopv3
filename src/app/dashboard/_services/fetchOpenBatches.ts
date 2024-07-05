import { apiUrls } from '../../../config/api';
import { fetchWrapper } from '../../../utils/fetchWrapper';

export type OpenBatches = {
  batchid: string;
  batchmastid: number;
  qtyremained: string;
  qtyproduced: string;
  status: string;
  quantity: string;
};

export const fetchOpenBatches = async (): Promise<OpenBatches[]> => {
  return await fetchWrapper(apiUrls.GET_OPEN_BATCHES, {
    method: 'GET',
  });
};
