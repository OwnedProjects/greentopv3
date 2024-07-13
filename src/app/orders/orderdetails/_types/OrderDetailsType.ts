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
