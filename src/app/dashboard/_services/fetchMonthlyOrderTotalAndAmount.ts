import { apiUrls } from '../../../config/api';
import { fetchWrapper } from '../../../utils/fetchWrapper';

export type MonthOrdersAmount = {
  count: number;
  totalamount: string;
  monthName: string;
};

export const fetchMonthlyOrderTotalAndAmount =
  async (): Promise<MonthOrdersAmount> => {
    return await fetchWrapper(apiUrls.GET_MONTHLY_ORDERS_TOTAL, {
      method: 'GET',
    });
  };
