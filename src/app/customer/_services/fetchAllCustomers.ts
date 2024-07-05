import { apiUrls } from '../../../config/api';
import { fetchWrapper } from '../../../utils/fetchWrapper';
import { CustomerTypes } from '../_types/CustomerTypes';

export const fetchAllCustomers = async (): Promise<CustomerTypes[]> => {
  return await fetchWrapper(apiUrls.GET_ACTIVE_CUSTOMERS, {
    method: 'GET',
  });
};
