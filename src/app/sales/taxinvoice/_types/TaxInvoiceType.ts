export type TaxInvoiceType = {
  orderid: number;
  invoiceno: string;
  invoicedt: string;
};

export const defaultTaxInvoiceFormVal: TaxInvoiceType = {
  orderid: 1,
  invoiceno: '',
  invoicedt: '',
};
