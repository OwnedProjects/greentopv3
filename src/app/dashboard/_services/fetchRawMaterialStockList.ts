import { apiUrls } from '../../../config/api';
import { fetchWrapper } from '../../../utils/fetchWrapper';
import { RawMat } from '../_widgets/RawMaterialList';

export const fetchRawMaterialStockList = async (): Promise<RawMat[]> => {
  return await fetchWrapper(apiUrls.GET_RAW_MATERIALS_STOCK_LIST, {
    method: 'GET',
  });
};
