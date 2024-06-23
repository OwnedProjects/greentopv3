import { apiUrls } from '../../../config/api';
import { fetchWrapper } from '../../../utils/fetchWrapper';
import { PRODMATS } from '../_widgets/FinishedProductsList';

export const fetchProductsStockList = async (): Promise<PRODMATS[]> => {
  return await fetchWrapper(apiUrls.GET_PRODUCTS_STOCK_LIST, { method: 'GET' });
};
