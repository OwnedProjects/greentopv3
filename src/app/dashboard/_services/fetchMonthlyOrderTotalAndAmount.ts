import { apiUrls } from '../../../config/api';
import { fetchWrapper } from '../../../utils/fetchWrapper';

export type MonthOrdersAmount = {
  count: number;
  totalamount: string;
  monthName: string;
};

export const fetchMonthlyOrderTotalAndAmount = async (
  timestamp: number | null
): Promise<MonthOrdersAmount> => {
  const baseurl = apiUrls.GET_MONTHLY_ORDERS_TOTAL.replace(
    '{ts}',
    timestamp?.toString() || ''
  );

  return await fetchWrapper(baseurl, {
    method: 'GET',
  });
};
