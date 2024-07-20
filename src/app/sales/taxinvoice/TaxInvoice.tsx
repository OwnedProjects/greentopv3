import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardHeader,
  Code,
  Input,
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

const TaxInvoice = () => {
  const [selectedOrders, setSelectedOrders] = useState<
    OpenOrderType | undefined
  >();
  const [selKey, setSelKey] = useState<string | undefined>();
  const [invoiceData, setInvoiceData] = useState<TaxInvoiceType>(
    defaultTaxInvoiceFormVal
  );

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

  useEffect(() => {
    console.log(latestBillNo);
    setInvoiceData({
      ...invoiceData,
      ['invoiceno']: latestBillNo?.billno.toString() || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestBillNo]);
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
                <div className="float-right text-sm font-semibold text-indigo-600">
                  Order: {selectedOrders.quantity} tons of {selectedOrders.name}
                </div>
              )}
              <div className="grid lg:grid-cols-3 xs:grid-cols-1 gap-6 pb-3">
                <div className="grid">
                  {loadingOrders ? (
                    <Spinner size="sm" />
                  ) : (
                    <Autocomplete
                      defaultItems={allOrders}
                      label={
                        !allOrders?.length ? 'NO ORDERS' : 'Select a Order'
                      }
                      size="sm"
                      variant={!allOrders?.length ? 'flat' : 'bordered'}
                      radius="none"
                      color="danger"
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
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};

export default TaxInvoice;
