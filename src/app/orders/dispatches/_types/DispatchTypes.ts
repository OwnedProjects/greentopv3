export type DeliveryFormBatch = {
  batchmastid: number;
  qtyremained: number;
  status: string;
};

export type DeliveryFormType = {
  orderno: string;
  deliveryDate: string;
  dcno: string;
  hasChallan: boolean;
  vehicleNo: string;
  packingKg: string;
  noOfBags: string;
  remarks: string;
  batches: DeliveryFormBatch[];
};

export const defaultDeliveryFormVals = {
  orderno: '',
  deliveryDate: '',
  dcno: '',
  hasChallan: false,
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
