import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Code,
  Image,
  Input,
  Link,
  Spinner,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Key, useEffect, useState } from 'react';
import AutoFillDateInput from '../../../components/AutoFillDateInput.tsx';
import { constants } from '../../../config/settings';
import { GenericError } from '../../../types/GenericError';
import { inputprops } from '../../../types/GenericInputProps';
import {
  fetchOpenOrders,
  OpenOrderType,
} from '../../orders/dispatches/_services/fetchOpenOrders';
import {
  fetchLastestBillId,
  LastestBillNumberType,
} from './_services/fetchLastestBillId.ts';
import {
  defaultTaxInvoiceFormVal,
  TaxInvoiceType,
} from './_types/TaxInvoiceType.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../../config/routes/routeConstants.ts';
import { validateDate } from '../../../utils/validateDate.ts';

type ValidationRule = {
  required?: boolean;
  isNumber?: boolean;
  customMessage?: string;
};

const TaxInvoice = () => {
  const [selectedOrders, setSelectedOrders] = useState<
    OpenOrderType | undefined
  >();
  const [selKey, setSelKey] = useState<string | undefined>();
  const [invoiceData, setInvoiceData] = useState<TaxInvoiceType>(
    defaultTaxInvoiceFormVal
  );
  const [autoCalc, setAutoCalc] = useState(true);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    isLoading: loadingOrders,
    data: allOrders,
    error: ordersError,
  } = useQuery<OpenOrderType[] | [], GenericError>({
    queryKey: ['taxinvoice-openorders-list'],
    queryFn: () => fetchOpenOrders('dispatched'),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const {
    isLoading: loadingLastBillNo,
    data: latestBillNo,
    error: billnoError,
  } = useQuery<LastestBillNumberType, GenericError>({
    queryKey: ['taxtinvoice-getbill-no'],
    queryFn: () => fetchLastestBillId(),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handleOrdersSelection = (key: Key | null) => {
    setSelKey(key as string);
    setSelectedOrders(
      allOrders?.filter((x) => x.orderid.toString() === key?.toString())?.[0]
    );
  };

  const handleInvoiceDateChange = (newDate: string) => {
    setInvoiceData({ ...invoiceData, invoicedt: newDate });
  };

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const validationRules: Record<keyof TaxInvoiceType, ValidationRule> = {
    invoiceno: { required: true, customMessage: 'Invoice Number is required' },
    invoicedt: { required: true, customMessage: 'Invoice Date is required' },
    rate: { required: true, customMessage: 'Rate is required' },
    amount: { required: true, customMessage: 'Amount is required' },
    discount: {
      required: true,
      customMessage: 'Discount should be 0 is not applicable',
    },
    amtb4gst: {
      required: true,
      customMessage: 'Amount before GST cannot be empty',
    },
    cgst: {
      required: true,
      customMessage: 'CGST should be 0 if not applicable',
    },
    sgst: {
      required: true,
      customMessage: 'SGST should be 0 if not applicable',
    },
    igst: {
      required: true,
      customMessage: 'IGST should be 0 if not applicable',
    },
    roundoff: {
      required: true,
      customMessage: 'Round off cannot not be empty',
    },
    totalamt: { required: true, customMessage: 'Total Amount is required' },
    discountremarks: {
      required: true,
      customMessage: 'Discount Remarks are required',
    },
  };

  const validateForm = (invoiceData: TaxInvoiceType) => {
    const newErrors: Record<string, string> = {};

    for (const field in validationRules) {
      const rules = validationRules[field as keyof TaxInvoiceType];
      const value = invoiceData[field as keyof TaxInvoiceType];

      if (rules.required && !String(value).trim()) {
        newErrors[field] = rules.customMessage || `${field} is required`;
      }

      if (rules.isNumber && isNaN(Number(value))) {
        newErrors[field] = rules.customMessage || `${field} must be a number`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (latestBillNo) {
      setInvoiceData({
        ...invoiceData,
        ['invoiceno']: latestBillNo?.billno.toString() || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestBillNo]);

  const handleSaveBill = () => {
    if (validateDate(invoiceData.invoicedt)) {
      if (validateForm(invoiceData)) {
        console.log('Form Valid');
      } else {
        console.log('Form has errors:', errors);
      }
    } else {
      console.log('INvalid Date');
    }
  };

  return (
    <>
      {ordersError || billnoError ? (
        <>
          <Code color="danger" className="text-balance">
            {ordersError
              ? JSON.stringify(ordersError.message)
              : billnoError && JSON.stringify(billnoError.message)}
          </Code>
        </>
      ) : (
        <>
          <Card radius="none">
            <CardHeader className="pb-0">
              <span className="text-sm font-semibold text-red-500">
                {constants.ALL_FIELDS_MANDATORY}
              </span>
            </CardHeader>
            <CardBody className="pt-1">
              {!loadingOrders && selectedOrders && (
                <>
                  <div className="float-right text-sm font-semibold text-indigo-600 w-1/2">
                    Order: {selectedOrders.quantity} tons of{' '}
                    {selectedOrders.name}
                  </div>
                </>
              )}
              <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-6 pb-3">
                <div className="grid">
                  {loadingOrders ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <Autocomplete
                        defaultItems={allOrders}
                        label={
                          !allOrders?.length ? 'NO ORDERS' : 'Select a Order'
                        }
                        size="sm"
                        variant={!allOrders?.length ? 'flat' : 'bordered'}
                        radius="none"
                        color={!allOrders?.length ? 'danger' : 'default'}
                        className={
                          !allOrders?.length ? 'border-1 border-red-400' : ''
                        }
                        selectedKey={selKey}
                        onSelectionChange={handleOrdersSelection}
                        isRequired
                        fullWidth
                        isDisabled={!allOrders?.length}
                      >
                        {(order) => (
                          <AutocompleteItem key={order.orderid}>
                            {order.orderno}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </>
                  )}
                </div>
                <div className="grid">
                  <Input
                    label="Invoice Number"
                    {...inputprops}
                    name="invoiceno"
                    value={invoiceData.invoiceno}
                    onChange={handleFormUpdate}
                    isDisabled={loadingLastBillNo}
                    isInvalid={!!errors.invoiceno}
                    errorMessage={errors.invoiceno}
                  />
                  {loadingLastBillNo ? <Spinner size="sm" /> : <></>}
                </div>
                <div className="grid">
                  <AutoFillDateInput
                    size="sm"
                    label="Invoice Date (DD-MM-YYYY)"
                    value={invoiceData.invoicedt}
                    onChange={handleInvoiceDateChange}
                  />
                  {errors.invoicedt ? (
                    <>
                      <span className="text-tiny text-danger">
                        {errors.invoicedt}
                      </span>
                    </>
                  ) : (
                    ''
                  )}
                </div>
                {selectedOrders ? (
                  <div className="grid">
                    <Link
                      underline="hover"
                      className="float-right cursor-pointer text-sm font-semibold"
                      onClick={() =>
                        navigate(
                          ROUTE_CONSTANTS.ORDERS +
                            '/' +
                            ROUTE_CONSTANTS.ORDER_DETAILS,
                          {
                            state: { oNo: selectedOrders?.orderno },
                          }
                        )
                      }
                    >
                      <Image
                        width={20}
                        radius="none"
                        alt="Orders"
                        src="../../../src/assets/eyes.svg"
                        className="float-left mr-2"
                      />
                      View Order Details
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-6 p-3 mt-2 border-1 border-gray-500">
                <div className="grid sm:col-span-4 xs:grid-cols-1 justify-center">
                  <Checkbox
                    radius="full"
                    isSelected={autoCalc}
                    onValueChange={setAutoCalc}
                    isDisabled={!selectedOrders}
                  >
                    Auto-Calculate
                  </Checkbox>
                </div>

                <div className="grid">
                  <Input
                    label="Rate"
                    {...inputprops}
                    name="rate"
                    value={invoiceData.rate}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.rate}
                    errorMessage={errors.rate}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="Amount"
                    {...inputprops}
                    name="amount"
                    value={invoiceData.amount}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.amount}
                    errorMessage={errors.amount}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="Discount"
                    {...inputprops}
                    name="discount"
                    value={invoiceData.discount}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.discount}
                    errorMessage={errors.discount}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="Amount Before GST"
                    {...inputprops}
                    name="amtb4gst"
                    value={invoiceData.amtb4gst}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.amtb4gst}
                    errorMessage={errors.amtb4gst}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="CGST"
                    {...inputprops}
                    name="cgst"
                    value={invoiceData.cgst}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.cgst}
                    errorMessage={errors.cgst}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="SGST"
                    {...inputprops}
                    name="sgst"
                    value={invoiceData.sgst}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.sgst}
                    errorMessage={errors.sgst}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="IGST"
                    {...inputprops}
                    name="igst"
                    value={invoiceData.igst}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.igst}
                    errorMessage={errors.igst}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="Round Off (+/-)"
                    {...inputprops}
                    name="roundoff"
                    value={invoiceData.roundoff}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.roundoff}
                    errorMessage={errors.roundoff}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="Total Amount"
                    {...inputprops}
                    name="totalamt"
                    value={invoiceData.totalamt}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.totalamt}
                    errorMessage={errors.totalamt}
                  />
                </div>
                <div className="grid col-span-3">
                  <Input
                    label="Discount Remarks"
                    {...inputprops}
                    name="discountremarks"
                    value={invoiceData.discountremarks}
                    onChange={handleFormUpdate}
                    isDisabled={!selectedOrders}
                    isInvalid={!!errors.discountremarks}
                    errorMessage={errors.discountremarks}
                  />
                </div>
              </div>

              <Button
                color="primary"
                radius="none"
                className="uppercase mt-4 mr-2 font-semibold text-md w-40"
                onPress={handleSaveBill}
              >
                Save Bill
              </Button>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};

export default TaxInvoice;
