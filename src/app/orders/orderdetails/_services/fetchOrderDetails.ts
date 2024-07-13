import { apiUrls } from '../../../../config/api';
import { fetchWrapper } from '../../../../utils/fetchWrapper';
import { OrderDetailsResponse } from '../_types/OrderDetailsType';

export const fetchOrderDetails = async (
  orderNo: string
): Promise<OrderDetailsResponse> => {
  const baseURL = `${apiUrls.GET_ORDER_DETAILS}?orderNo=${orderNo}`;
  return await fetchWrapper(baseURL, {
    method: 'GET',
  });
};
