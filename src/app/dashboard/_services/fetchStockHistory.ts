import { apiUrls } from '../../../config/api';
import { fetchWrapper } from '../../../utils/fetchWrapper';

export type StockHistory = {
  INorOUT: string; // "IN" or "OUT"
  date: string | number; // String or Number (timestamp)
  quantity: string | number; // String or Number (numeric quantity)
  remarks: string; // Textual remarks
  stockid: number; // Numeric identifier for the stock
  stockregid: number; // Numeric registration ID
  // Add other fields relevant to your stock history data
};
export const fetchStockHistory = async (
  stockid: number,
  sortBy: string
): Promise<StockHistory[]> => {
  const baseurl = apiUrls.GET_STOCK_HISTORY_LIST.replace(
    '{stockid}',
    stockid.toString()
  ).replace('{sortBy}', sortBy.toString());
  return await fetchWrapper(baseurl, { method: 'GET' });
};
