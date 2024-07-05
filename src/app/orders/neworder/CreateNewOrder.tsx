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
import { useMutation, useQuery } from '@tanstack/react-query';
import { Key, useEffect, useState } from 'react';
import AutoFillDateInput from '../../../components/AutoFillDateInput.tsx/index.tsx';
import Snackbar, {
  SnackbarProps,
} from '../../../components/Snackbar/Snackbar.tsx';
import { constants } from '../../../config/settings.ts';
import { GenericError } from '../../../types/GenericError.ts';
import { inputprops } from '../../../types/GenericInputProps.ts';
import { fetchAllCustomers } from '../../customer/_services/fetchAllCustomers.ts';
import { CustomerTypes } from '../../customer/_types/CustomerTypes.ts';
import {
  AllProducts,
  fetchAllProducts,
} from '../../products/_services/fetchAllProducts.ts';
import {
  LastOrderNumberType,
  fetchLastOrderNo,
} from './_services/fetchLastOrderNo.ts';
import { submitNewOrder } from './_services/submitNewOrder.ts';
import {
  ConsigneeForm,
  NewOrderType,
  NewOrderTypeDefaultVals,
} from './_types/NewOrderTypes.ts';
import AddConsignees from './_widgets/AddConsignees.tsx';
import AllConsignees from './_widgets/AllConsignees.tsx';

const CreateNewOrder = () => {
  const [orderDate, setOrderDate] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const [selCustKey, setSelCustKey] = useState<string | undefined>();
  const [selectedCustomer, setSelectedCustomer] = useState<
    CustomerTypes | undefined
  >();
  const [orderDetails, setOrderDetails] = useState<NewOrderType>(
    NewOrderTypeDefaultVals
  );
  const [snackbar, setSnackbar] = useState<SnackbarProps | null>(null);
  const [resetKey, setResetKey] = useState(0); // Add a reset key to force reset

  const showSnackbar = (
    message: string,
    type: 'success' | 'error',
    duration = 3000
  ) => {
    setSnackbar({
      message,
      type,
      duration: duration,
      snackkey: new Date().getTime(),
    });
  };

  const {
    isLoading: loadingProds,
    data: allProducts,
    error: productsError,
  } = useQuery<AllProducts[], GenericError>({
    queryKey: ['products-list'],
    queryFn: fetchAllProducts,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const {
    isLoading: loadingCustomers,
    data: allCusts,
    error: customerError,
  } = useQuery<CustomerTypes[], GenericError>({
    queryKey: ['customers-list'],
    queryFn: fetchAllCustomers,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const {
    isLoading: loadingLastOrder,
    data: lastOrderNumber,
    error: lastOrderError,
    refetch: refetchLastOrderNo,
  } = useQuery<LastOrderNumberType, GenericError>({
    queryKey: ['last-order-no'],
    queryFn: fetchLastOrderNo,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { mutate: submitNewOrderRequest } = useMutation({
    mutationKey: ['submit-new-order'],
    mutationFn: submitNewOrder,
    onSuccess: (data) => {
      showSnackbar(data.message, 'success');
      resetForm();
    },
    onError: (err) => {
      console.log('ERROR', err);
      showSnackbar('Order failed', 'error');
    },
  });

  useEffect(() => {
    if (lastOrderNumber || lastOrderError) {
      setOrderNo(lastOrderNumber?.newOrderNo || '');
      setOrderDetails({
        ...orderDetails,
        orderNo: lastOrderNumber?.newOrderNo || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastOrderError, lastOrderNumber]);

  if (productsError || customerError) {
    console.log(
      'PRODUCTS || Customer LIST ERROR ',
      productsError,
      customerError
    );
    if (productsError && productsError?.status > 500) throw productsError;
    if (customerError && customerError?.status > 500) throw customerError;
  }

  const handleOrderDateChange = (newDate: string) => {
    setOrderDate(newDate);
    setOrderDetails({
      ...orderDetails,
      orderDate: newDate,
    });
  };

  const handleAddConsignee = (consigneeForm: ConsigneeForm) => {
    setOrderDetails({
      ...orderDetails,
      consignee: [...orderDetails.consignee, consigneeForm],
    });
    console.log('orderDetails', orderDetails);
  };

  const handleChangeOrderQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    if (e.target.name === 'orderNo') {
      setOrderNo(e.target.value);
      setOrderDetails({
        ...orderDetails,
        orderNo: e.target.value,
      });
    } else {
      setQuantity(e.target.value);
      setOrderDetails({
        ...orderDetails,
        quantity: e.target.value,
      });
    }
  };

  const handleProductSelection = (key: Key | null) => {
    setSelectedProduct(key as string);
    setOrderDetails({
      ...orderDetails,
      prodid: key as string,
    });
  };

  const handleCustomerSelection = (key: Key | null) => {
    const selCust =
      allCusts?.filter((x) => x.clientid.toString() === key?.toString())?.[0] ||
      undefined;
    setSelectedCustomer(selCust);
    setSelCustKey(key as string);
    setOrderDetails({
      ...orderDetails,
      selectedCustomer: selCust,
    });
  };

  const handleRemoveConsignees = (consi: ConsigneeForm) => {
    setOrderDetails((prevState) => {
      const updatedConsignees = prevState.consignee.filter(
        (x: ConsigneeForm) => x.keyid !== consi.keyid
      );

      return {
        ...prevState,
        consignee: updatedConsignees,
      };
    });
  };

  const resetForm = () => {
    setOrderDate('');
    setOrderNo('');
    setQuantity('');
    setSelectedProduct(undefined);
    setSelCustKey(undefined);
    setSelectedCustomer(undefined);
    setOrderDetails(NewOrderTypeDefaultVals);
    refetchLastOrderNo();
    setResetKey(resetKey + 1); // Increment reset key
  };

  const placeOrder = () => {
    let totalConsigneeQty = 0;
    orderDetails.consignee.forEach(
      (x) => (totalConsigneeQty += parseFloat(x.quantity))
    );
    if (
      totalConsigneeQty < parseFloat(orderDetails.quantity || '0') ||
      totalConsigneeQty > parseFloat(orderDetails.quantity || '0')
    ) {
      showSnackbar(
        'Order quantity mismatched with the total consignee quantity.',
        'error',
        4000
      );
      return;
    }
    console.log('PLACE ORDER', orderDetails);
    submitNewOrderRequest(orderDetails);
  };

  return (
    <>
      {productsError ? (
        <>
          <Code color="danger" className="text-balance">
            {JSON.stringify(productsError.message)}
          </Code>
        </>
      ) : (
        <>
          <Card radius="none">
            <CardHeader className="pb-0">
              <span className="text-sm text-semibold text-red-500">
                {constants.ALL_FIELDS_MANDATORY}
              </span>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-6 py-3">
                <div className="grid">
                  <Input
                    type="text"
                    label="Order No"
                    {...inputprops}
                    value={orderNo}
                    onChange={handleChangeOrderQty}
                  />
                  {loadingLastOrder && <Spinner size="sm" />}
                </div>
                <div className="grid col-span-2">
                  {loadingProds ? (
                    <Spinner size="sm" />
                  ) : (
                    <Autocomplete
                      key={`prod-${resetKey}`} // Use reset key to force reset
                      defaultItems={allProducts}
                      label="Select a Product"
                      size="sm"
                      variant="bordered"
                      radius="none"
                      selectedKey={selectedProduct}
                      onSelectionChange={handleProductSelection}
                      isRequired
                      fullWidth
                    >
                      {(product) => (
                        <AutocompleteItem key={product.prodid}>
                          {product.prodname}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                </div>
                <div className="grid">
                  <AutoFillDateInput
                    size="sm"
                    label="Order Date(DD-MM-YYYY)"
                    value={orderDate}
                    onChange={handleOrderDateChange}
                  />
                  {/* O-{orderDate} */}
                </div>
              </div>
              <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-6 py-3">
                <div className="grid col-span-3">
                  {loadingCustomers ? (
                    <Spinner size="sm" />
                  ) : (
                    <Autocomplete
                      key={`cust-${resetKey}`} // Use reset key to force reset
                      defaultItems={allCusts}
                      label="Select Customer"
                      size="sm"
                      variant="bordered"
                      radius="none"
                      selectedKey={selCustKey}
                      onSelectionChange={handleCustomerSelection}
                      isRequired
                      fullWidth
                    >
                      {(customer) => (
                        <AutocompleteItem key={customer.clientid}>
                          {customer.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                </div>
                <div className="grid">
                  <Input
                    type="number"
                    label="Quantity(tons)"
                    {...inputprops}
                    value={quantity}
                    onChange={handleChangeOrderQty}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          <AddConsignees
            handleAddConsignee={handleAddConsignee}
            selCust={selectedCustomer}
            quantity={quantity}
          />
          {orderDetails?.orderNo &&
          orderDetails.prodid &&
          orderDetails.orderDate &&
          orderDetails.selectedCustomer &&
          orderDetails.quantity &&
          orderDetails.consignee.length ? (
            <AllConsignees
              orderDetails={orderDetails}
              handleRemoveConsignees={handleRemoveConsignees}
              placeOrder={placeOrder}
            />
          ) : (
            ''
          )}
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

export default CreateNewOrder;
