export type FinancialYr = {
  month: number;
  monthName: string;
};

const financialYear: FinancialYr[] = [
  { month: 4, monthName: 'April' },
  { month: 5, monthName: 'May' },
  { month: 6, monthName: 'June' },
  { month: 7, monthName: 'July' },
  { month: 8, monthName: 'August' },
  { month: 9, monthName: 'September' },
  { month: 10, monthName: 'October' },
  { month: 11, monthName: 'November' },
  { month: 12, monthName: 'December' },
  { month: 1, monthName: 'January' },
  { month: 2, monthName: 'February' },
  { month: 3, monthName: 'March' },
];

export const constants = {
  API_GATEWAY_URL: import.meta.env.VITE_API_GATEWAY_URL,
  ASC: 'ASC',
  DESC: 'DESC',
  FINANCIALYR: financialYear,
  ALL_FIELDS_MANDATORY: '* All fields are mandatory',
  API_NOT_FOUND: '404 - Api Not Found',
  SELF: 'SELF',
  CONSIGNEE: 'CONSIGNEE',
  SELECT_MANUFACTURE_BATCH: 'Select Manufacture Batch and Quantity',
};
