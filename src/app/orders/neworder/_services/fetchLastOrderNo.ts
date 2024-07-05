import { apiUrls } from '../../../../config/api';
import { fetchWrapper } from '../../../../utils/fetchWrapper';

export type LastOrderNumberType = {
  OrderCount: number;
  newOrderNo: string;
};

export const fetchLastOrderNo = async (): Promise<LastOrderNumberType> => {
  return await fetchWrapper(apiUrls.GET_LAST_ORDER_NO, {
    method: 'GET',
  });
};
