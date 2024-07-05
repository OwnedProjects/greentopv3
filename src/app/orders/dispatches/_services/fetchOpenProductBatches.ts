import { apiUrls } from '../../../../config/api';
import { fetchWrapper } from '../../../../utils/fetchWrapper';
import { OpenProductBatchType } from '../_types/DispatchTypes';

export const fetchOpenProductBatches = async (
  prodid: number
): Promise<OpenProductBatchType[] | []> => {
  const baseurl = apiUrls.GET_OPEN_PRODUCT_BATCHES.replace(
    '{prodid}',
    JSON.stringify(prodid)
  );
  return await fetchWrapper(baseurl, {
    method: 'GET',
  });
};
