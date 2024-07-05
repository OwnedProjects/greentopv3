import { constants } from '../../../../config/settings';
import { CustomerTypes } from '../../../customer/_types/CustomerTypes';

export type ConsigneeForm = {
  keyid?: number;
  name: string;
  contactPerson: string;
  contactNumber: string;
  consigneeAddress: string;
  city: string;
  state: string;
  quantity: string;
  gst: string;
  deliveryAddress: string;
  consigneeType: typeof constants.SELF | typeof constants.CONSIGNEE;
};

export type NewOrderType = {
  orderNo: string | null;
  prodid: string | number | null | undefined;
  orderDate: string | null;
  quantity: string | null;
  selectedCustomer: CustomerTypes | null | undefined;
  consignee: ConsigneeForm[];
};

export const NewOrderTypeDefaultVals: NewOrderType = {
  orderNo: null,
  prodid: null,
  orderDate: null,
  quantity: null,
  selectedCustomer: null,
  consignee: [],
};

export type NewOrderTypeResponse = {
  message: string;
  status: number;
  orderId: number;
};
