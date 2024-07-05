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

export const fetchOpenOrders = async (): Promise<OpenOrderType[] | []> => {
  return await fetchWrapper(apiUrls.GET_OPEN_ORDERS, {
    method: 'GET',
  });
};
