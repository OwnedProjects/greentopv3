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

type fetchAllOrdersProps = {
  fromDt?: string;
  toDt?: string;
};

export const fetchAllOrders = async ({
  fromDt,
  toDt,
}: fetchAllOrdersProps): Promise<OpenOrderType[] | []> => {
  const baseURL =
    fromDt && toDt
      ? apiUrls.GET_ORDERS + `?fromDt=${fromDt}&toDt=${toDt}`
      : apiUrls.GET_ORDERS;
  return await fetchWrapper(baseURL, {
    method: 'GET',
  });
};
