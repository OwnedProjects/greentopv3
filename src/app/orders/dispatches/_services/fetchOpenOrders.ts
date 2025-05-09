import { apiUrls } from '../../../../config/api';
import { fetchWrapper } from '../../../../utils/fetchWrapper';

export type OpenOrderType = {
  orderid: number;
  prodid: number;
  name: string;
  orderno: string;
  orderdt: string;
  quantity: string;
  remarks: string;
  orderdate: string;
};

export const fetchOpenOrders = async (
  status: string
): Promise<OpenOrderType[] | []> => {
  const baseURL = apiUrls.GET_ORDERS + '?status=' + status;
  return await fetchWrapper(baseURL, {
    method: 'GET',
  });
};
