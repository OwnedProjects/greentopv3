import { apiUrls } from '../../../../config/api';
import { fetchWrapper } from '../../../../utils/fetchWrapper';
import { NewOrderType, NewOrderTypeResponse } from '../_types/NewOrderTypes';

export const submitNewOrder = async (
  orderDetails: NewOrderType
): Promise<NewOrderTypeResponse> => {
  return await fetchWrapper(apiUrls.SUBMIT_NEW_ORDER, {
    method: 'POST',
    body: JSON.stringify(orderDetails),
  });
};
