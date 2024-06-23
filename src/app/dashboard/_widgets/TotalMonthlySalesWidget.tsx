import {
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Image,
  Spinner,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { GenericError } from '../../../types/GenericError';
import {
  MonthOrdersAmount,
  fetchMonthlyOrderTotalAndAmount,
} from '../_services/fetchMonthlyOrderTotalAndAmount';

const TotalMonthlySalesWidget = () => {
  const { isLoading, data, error } = useQuery<MonthOrdersAmount, GenericError>({
    queryKey: ['order-total'],
    queryFn: fetchMonthlyOrderTotalAndAmount,
  });

  if (error) {
    console.log('Sales Total Order ', error);
    if (error.status > 500) throw error;
  }

  return (
    <>
      {error ? (
        <>
          <Code color="danger" className="text-balance">
            {JSON.stringify(error.message)}
          </Code>
        </>
      ) : (
        <>
          <Card className="max-w-full">
            <CardHeader className="">
              <div className="w-full">
                <Image
                  width={30}
                  radius="none"
                  alt="Orders"
                  src="../../../src/assets/orders-cart.svg"
                  className="float-left"
                />
                <span className="text-md uppercase font-semibold float-left pt-1 pl-3">
                  Total
                  <strong className="font-bold px-2 text-blue-600">
                    {data?.monthName}
                  </strong>
                  Sales
                </span>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              {isLoading ? (
                <Spinner label="Loading..." />
              ) : (
                <div className="grid xl:grid-cols-3 xs:grid-cols-1 gap-2">
                  <Card className="max-h-full h-auto w-full">
                    <CardHeader className="justify-center">
                      <p className="text-sm uppercase font-semibold"> orders</p>
                    </CardHeader>
                    <Divider />
                    <CardBody className="text-center py-5">
                      <p className="text-5xl font-bold text-primary-700 py-5">
                        {data?.count}
                      </p>
                    </CardBody>
                  </Card>
                  <Card className="max-h-full h-auto xl:col-span-2 xs:col-span-1">
                    <CardHeader className="justify-center">
                      <p className="text-sm uppercase font-semibold">Amount</p>
                    </CardHeader>
                    <Divider />
                    <CardBody className="text-center py-5">
                      <p className="text-2xl font-bold text-primary-700 py-5">
                        {data?.totalamount}
                      </p>
                    </CardBody>
                  </Card>
                </div>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};

export default TotalMonthlySalesWidget;
