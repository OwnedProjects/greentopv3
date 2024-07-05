import { apiUrls } from '../../../config/api';
import { fetchWrapper } from '../../../utils/fetchWrapper';

export type AllProducts = {
  prodid: number;
  prodname: string;
  brandname: string;
  hsncode: string;
};

export const fetchAllProducts = async (): Promise<AllProducts[]> => {
  return await fetchWrapper(apiUrls.GET_ACTIVE_PRODUCTS, {
    method: 'GET',
  });
};
