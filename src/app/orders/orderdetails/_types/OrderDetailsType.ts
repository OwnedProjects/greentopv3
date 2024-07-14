export type OrderDetailsResponse = {
  orderId: number;
  prodid: number;
  orderno: string;
  orderdt: string; // or Date if you prefer to parse it
  orderdate: string; // or Date if you prefer to parse it
  clientid: number;
  quantity: string;
  remarks: string;
  orderstatus: string;
  prodname: string;
  custname: string;
  consignees: OrderDetailsConsignee[];
  dispatches: OrderDetailsDispatch[];
  payments: OrderDetailsPaymentsType[];
};

export type OrderDetailsConsignee = {
  orderconsignid: number;
  consigneename: string;
  contactperson: string;
  contactnumber: string;
  city: string;
  state: string;
  address: string;
  quantity: string;
  consigneegst: string;
  deliveryaddress: string;
  remarks: string;
};

export type OrderDetailsDispatch = {
  dispatchid: number;
  dispatchdate: string; // or Date if you prefer to parse it
  dcno: string;
  vehicalno: string;
  packingkgs: string;
  noofbags: string;
  nochallan: string;
  deliveryremarks: string;
  batchmastid: number;
  quantity: string;
  batchid: string;
};

export type OrderDetailsPaymentsType = {
  otaxinvoiceid: number;
  billno: string;
  billdt: string;
  amount: string;
  discount: string;
  rate: string;
  cgst: string;
  sgst: string;
  igst: string;
  roundoff: string;
  totalamount: string;
  discountremarks: string;
  csgtAmt: number;
  isgtAmt: number;
  billdate: string;
};
