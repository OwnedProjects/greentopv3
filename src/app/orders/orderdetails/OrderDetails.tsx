import {
  Button,
  Card,
  CardBody,
  Code,
  Divider,
  Image,
  Input,
  Spinner,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { GenericError } from "../../../types/GenericError";
import { inputprops } from "../../../types/GenericInputProps";
import { fetchOrderDetails } from "./_services/fetchOrderDetails";
import { OrderDetailsResponse } from "./_types/OrderDetailsType";
import OrderDetailsConsignees from "./_widgets/OrderDetailsConsignees";
import OrderDetailsDispatches from "./_widgets/OrderDetailsDispatches";
import OrderDetailsPayments from "./_widgets/OrderDetailsPayments";

const OrderDetails = () => {
  const location = useLocation();
  const [orderNo, setOrderNo] = useState<string>("");
  const [searchOrderNo, setSearchOrderNo] = useState<string>("");

  const { oNo } = location.state || {};

  useEffect(() => {
    if (oNo) {
      setOrderNo(oNo);
      setSearchOrderNo(oNo);
    }
  }, [oNo]);

  const {
    isLoading,
    data: orderDets,
    error: orderDetError,
  } = useQuery<OrderDetailsResponse, GenericError>({
    queryKey: ["orderdetails-order", orderNo],
    queryFn: () => fetchOrderDetails(orderNo),
    enabled: searchOrderNo !== "",
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handleOrderNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNo(e.target.value);
  };

  const handleSearchOrderDetails = () => {
    setSearchOrderNo(orderNo.trim());
  };

  return (
    <>
      <Card radius="none">
        <CardBody className="py-3">
          {!oNo ? (
            <>
              <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-6">
                <div className="grid">
                  <Input
                    type="text"
                    label="Order No"
                    {...inputprops}
                    value={orderNo}
                    onChange={handleOrderNo}
                  />
                </div>
                <div className="grid">
                  <Button
                    color="success"
                    radius="none"
                    className="mt-1 max-w-40 uppercase"
                    startContent={
                      <Image
                        width={20}
                        radius="none"
                        alt="Search Order"
                        src="../../../src/assets/filters.svg"
                      />
                    }
                    isDisabled={!orderNo}
                    onPress={handleSearchOrderDetails}
                  >
                    Search Order
                  </Button>
                </div>
              </div>
              <Divider className="my-2" />
            </>
          ) : (
            <></>
          )}

          {orderDetError ? (
            <>
              <Code color="danger" className="text-balance">
                {orderDetError.message}
              </Code>
            </>
          ) : (
            <>
              {isLoading ? (
                <Spinner />
              ) : orderDets ? (
                <>
                  <div className="grid lg:grid-cols-7 xs:grid-cols-1 gap-6 pt-2 text-violet-700 font-semibold">
                    <div className="grid">Order No: {orderDets?.orderno}</div>
                    <div className="grid">
                      Order Date: {orderDets?.orderdate}
                    </div>
                    <div className="grid">
                      Quantity: {orderDets?.quantity} tons
                    </div>
                    <div className="grid col-span-2">
                      Product: {orderDets?.prodname}
                    </div>
                    <div className="grid col-span-2">
                      Customer: {orderDets?.custname}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </CardBody>
      </Card>

      {!isLoading && !orderDetError && orderDets ? (
        <>
          <div className="my-3">
            <OrderDetailsConsignees
              consignees={orderDets?.consignees}
              consigneeType={orderDets.remarks}
            />
          </div>
          <div className="my-3">
            <OrderDetailsDispatches dispatches={orderDets.dispatches} />
          </div>
          <div className="my-3">
            <OrderDetailsPayments payments={orderDets.payments} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderDetails;
