import { apiUrls } from '../../../../config/api';
import { fetchWrapper } from '../../../../utils/fetchWrapper';

export type LastestBillNumberType = {
  billno: string | number;
};

export const fetchLastestBillId = async (): Promise<LastestBillNumberType> => {
  return await fetchWrapper(apiUrls.GET_LASTEST_BILL_ID, {
    method: 'GET',
  });
};
