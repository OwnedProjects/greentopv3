import { apiUrls } from '../../../config/api';
import { fetchWrapper } from '../../../utils/fetchWrapper';

export type MonthPurchasesAmount = {
  count: number;
  totalamount: string;
  monthName: string;
};

export const fetchMonthlyPurchasesTotalAndAmount = async (
  timestamp: number | null
): Promise<MonthPurchasesAmount> => {
  const baseurl = apiUrls.GET_MONTHLY_PURCHASES_TOTAL_AMOUNT.replace(
    '{ts}',
    timestamp?.toString() || ''
  );

  return await fetchWrapper(baseurl, {
    method: 'GET',
  });
};
