export type DeliveryFormBatch = {
  batchid: string;
  batchmastid: number;
  qtyproduced: string;
  qtyremained: string;
  status: string;
  newqtyremained: number;
  selectedqty: string;
};

export type DeliveryFormType = {
  orderid: number;
  orderno: string;
  deliveryDate: string;
  dcno: string;
  noChallan: boolean;
  vehicleNo: string;
  packingKg: string;
  noOfBags: string;
  remarks: string;
  batches: DeliveryFormBatch[];
};

export const defaultDeliveryFormVals = {
  orderid: -1,
  orderno: '',
  deliveryDate: '',
  dcno: '',
  noChallan: false,
  vehicleNo: '',
  packingKg: '',
  noOfBags: '',
  remarks: '',
  batches: [],
};

export type OpenProductBatchType = {
  batchid: string;
  prodid: number;
  batchmastid: number;
  qtyremained: string;
  qtyproduced: string;
  status: string;
  prodname: string;
  manufacdateDDMMYYYY: string;
};
