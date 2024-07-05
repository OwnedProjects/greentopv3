import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Spinner,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Key, useEffect, useState } from 'react';
import { constants } from '../../../config/settings';
import { GenericError } from '../../../types/GenericError';
import {
  MonthOrdersAmount,
  fetchMonthlyOrderTotalAndAmount,
} from '../_services/fetchMonthlyOrderTotalAndAmount';

const TotalMonthlySalesWidget = () => {
  const [monthName, setmonthName] = useState('');
  const [ts, setTs] = useState<number | null>(null);
  const currMonth = new Date().getMonth() + 1;
  const financialYrs = [...constants.FINANCIALYR];
  const index = financialYrs.findIndex((month) => month.month === currMonth);
  const monthsUpToCurrMonth = financialYrs.slice(0, index + 1);

  const { isLoading, data, error } = useQuery<MonthOrdersAmount, GenericError>({
    queryKey: ['order-total', ts],
    queryFn: () => fetchMonthlyOrderTotalAndAmount(ts),
    enabled: !!(ts || ts === null),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (error) {
    console.log('Sales Total Order ', error);
    if (error.status > 500) throw error;
  }

  useEffect(() => {
    if (data) {
      setmonthName(data?.monthName);
    }
  }, [data]);

  const handleMonthChange = (key: Key) => {
    console.log(key);
    const monthNm = monthsUpToCurrMonth.filter(
      (x) => x.month.toString() === key.toString()
    )[0].monthName;
    if (monthNm.toLowerCase() !== monthName.toLowerCase()) {
      //Avoid calling API if reselecting the same month
      setmonthName(monthNm);
      const timestamp = new Date(
        `${key}/01/${new Date().getFullYear()}`
      ).getTime();
      setTs(timestamp);
    }
  };

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
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
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
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          color="primary"
                          variant="flat"
                          className="uppercase mx-2 font-semibold text-md h-auto min-w-10"
                        >
                          {monthName}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dropdown Variants"
                        color="primary"
                        variant="flat"
                        onAction={(key) => handleMonthChange(key)}
                      >
                        {monthsUpToCurrMonth &&
                          monthsUpToCurrMonth.map((x) => (
                            <DropdownItem key={x.month}>
                              {x.monthName}
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                    Sales
                  </span>
                </div>
              )}
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
