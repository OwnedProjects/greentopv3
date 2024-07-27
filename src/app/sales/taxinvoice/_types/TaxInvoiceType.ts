export type TaxInvoiceType = {
  invoiceno: string;
  invoicedt: string;
  rate: string;
  amount: string;
  discount: string;
  amtb4gst: string;
  cgst: string;
  sgst: string;
  igst: string;
  roundoff: string;
  totalamt: string;
  discountremarks: string;
};

export const defaultTaxInvoiceFormVal: TaxInvoiceType = {
  invoiceno: '',
  invoicedt: '',
  rate: '0',
  amount: '0',
  discount: '0',
  amtb4gst: '0',
  cgst: '0',
  sgst: '0',
  igst: '0',
  roundoff: '0',
  totalamt: '0',
  discountremarks: '',
};
