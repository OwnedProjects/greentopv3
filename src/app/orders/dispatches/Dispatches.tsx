import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Code,
  Input,
  //   Input,
  //   InputProps,
  Spinner,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Key, useEffect, useState } from 'react';
import AutoFillDateInput from '../../../components/AutoFillDateInput.tsx';
import { constants } from '../../../config/settings';
import { GenericError } from '../../../types/GenericError';
import { inputprops } from '../../../types/GenericInputProps.ts';
import { OpenOrderType, fetchOpenOrders } from './_services/fetchOpenOrders';
import {
  DeliveryFormBatch,
  DeliveryFormType,
  defaultDeliveryFormVals,
} from './_types/DispatchTypes.ts';
import ManufactureBatchSelection from './_widgets/ManufactureBatchSelection.tsx';
import ManufactureBatchList from './_widgets/ManufactureBatchList.tsx';
import Snackbar, {
  SnackbarProps,
} from '../../../components/Snackbar/Snackbar.tsx';

const Dispatches = () => {
  const [selKey, setSelKey] = useState<string | undefined>();
  const [selectedOrders, setSelectedOrders] = useState<
    OpenOrderType | undefined
  >();
  const [deliveryForm, setDeliveryForm] = useState<DeliveryFormType>(
    defaultDeliveryFormVals
  );
  const [noChallan, setNoChallan] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarProps | null>(null);

  const {
    isLoading: loadingOrders,
    data: allOrders,
    error: ordersError,
  } = useQuery<OpenOrderType[] | [], GenericError>({
    queryKey: ['dispatches-openorders-list'],
    queryFn: fetchOpenOrders,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // console.log(loadingOrders, allOrders, ordersError);

  const handleOrdersSelection = (key: Key | null) => {
    // setSelectedOrders(key as string);
    setSelKey(key as string);
    setSelectedOrders(
      allOrders?.filter((x) => x.orderid.toString() === key?.toString())?.[0]
    );
  };

  const handleDeliveryDateChange = (newDate: string) => {
    setDeliveryForm({ ...deliveryForm, deliveryDate: newDate });
  };

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryForm({ ...deliveryForm, [name]: value });
  };

  const handleAddBatchToDispatch = (batch: DeliveryFormBatch) => {
    setDeliveryForm({
      ...deliveryForm,
      batches: [...deliveryForm.batches, batch],
    });
  };

  useEffect(() => {
    if (selectedOrders) {
      const bags = (Number(selectedOrders.quantity) * 1000) / 50;
      setDeliveryForm({
        ...deliveryForm,
        orderid: selectedOrders.orderid,
        orderno: selectedOrders.orderno,
        packingKg: '50',
        noOfBags: JSON.stringify(bags),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrders]);

  useEffect(() => {
    if (noChallan) {
      setDeliveryForm({
        ...deliveryForm,
        noChallan: true,
        remarks: "Party's Transport",
      });
    } else {
      setDeliveryForm({
        ...deliveryForm,
        noChallan: false,
        remarks: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noChallan]);

  const handleRemoveBatches = (batch: DeliveryFormBatch) => {
    console.log(batch);
    setDeliveryForm((prevState) => {
      const updatedBatches = prevState.batches.filter(
        (x: DeliveryFormBatch) => x.batchmastid !== batch.batchmastid
      );

      return {
        ...prevState,
        batches: updatedBatches,
      };
    });
  };

  const dispatchOrder = () => {
    // TODO: Validate Delivery Date against regex for proper date
    const errorObj: SnackbarProps = {
      message: '',
      type: 'error',
      duration: 4000,
      snackkey: new Date().getTime(),
    };
    if (selectedOrders) {
      const totalSelectedBatchesQty = deliveryForm.batches.reduce(
        (acc, x) => acc + parseFloat(x.selectedqty),
        0
      );
      console.log(
        '==>',
        parseFloat(selectedOrders.quantity),
        totalSelectedBatchesQty
      );

      if (totalSelectedBatchesQty && selectedOrders.quantity) {
        if (parseFloat(selectedOrders.quantity) === totalSelectedBatchesQty) {
          //Success
          console.log('SUCCESS now Proceed for API Call', deliveryForm);
        } else {
          setSnackbar({
            ...errorObj,
            message:
              'Total selected Batch Quantity is not equal to total order quantity',
          });
          // Error to show that both quantities does not match to suffice a dispatch
        }
      } else {
        setSnackbar({
          ...errorObj,
          message: constants.SOMETHING_WENT_WRONG_REFRESH,
        });
        // Something weird happened in reducer and total is not right
      }
    } else {
      // Order Not selected, which is rare but should throw an error
      setSnackbar({
        ...errorObj,
        message:
          'Please select and Order to proceed, if still same issue then refresh the page',
      });
    }
  };

  return (
    <>
      {ordersError ? (
        <>
          <Code color="danger" className="text-balance">
            {JSON.stringify(ordersError.message)}
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
              <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-6 pb-3">
                <div className="grid">
                  {loadingOrders ? (
                    <Spinner size="sm" />
                  ) : (
                    <Autocomplete
                      defaultItems={allOrders}
                      label="Select a Order"
                      size="sm"
                      variant="bordered"
                      radius="none"
                      selectedKey={selKey}
                      onSelectionChange={handleOrdersSelection}
                      isRequired
                      fullWidth
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
                  <AutoFillDateInput
                    size="sm"
                    label="Delivery Date(DD-MM-YYYY)"
                    value={deliveryForm.deliveryDate}
                    onChange={handleDeliveryDateChange}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="Delivery Challan Number"
                    {...inputprops}
                    name="dcno"
                    value={deliveryForm.dcno}
                    onChange={handleFormUpdate}
                  />
                </div>
                <div className="grid">
                  <Checkbox
                    radius="full"
                    isSelected={noChallan}
                    onValueChange={setNoChallan}
                  >
                    No Challan
                  </Checkbox>
                </div>
                <div className="grid">
                  <Input
                    label="Vehicle Number"
                    {...inputprops}
                    name="vehicleNo"
                    value={deliveryForm.vehicleNo}
                    onChange={handleFormUpdate}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="Packaging (Kg)"
                    {...inputprops}
                    name="packingKg"
                    value={deliveryForm.packingKg}
                    onChange={handleFormUpdate}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="No. of Bags"
                    {...inputprops}
                    name="noOfBags"
                    value={deliveryForm.noOfBags}
                    onChange={handleFormUpdate}
                  />
                </div>
                <div className="grid">
                  <Input
                    label="Remarks"
                    {...inputprops}
                    name="remarks"
                    value={deliveryForm.remarks}
                    onChange={handleFormUpdate}
                    isRequired={false}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          {selectedOrders &&
          deliveryForm &&
          deliveryForm.deliveryDate &&
          deliveryForm.dcno &&
          deliveryForm.packingKg &&
          deliveryForm.noOfBags &&
          deliveryForm.vehicleNo ? (
            <>
              <ManufactureBatchSelection
                prodid={selectedOrders.prodid}
                batches={deliveryForm.batches}
                handleAddBatchToDispatch={handleAddBatchToDispatch}
              />
            </>
          ) : (
            ''
          )}
          <ManufactureBatchList
            batches={deliveryForm.batches}
            handleRemoveBatches={handleRemoveBatches}
            dispatchOrder={dispatchOrder}
          />
        </>
      )}
      {snackbar && (
        <Snackbar
          snackkey={snackbar.snackkey} // Use the unique key to force re-render
          message={snackbar.message}
          type={snackbar.type}
          duration={snackbar.duration}
        />
      )}
    </>
  );
};

export default Dispatches;
