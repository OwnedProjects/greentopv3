import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react';

const TotalMonthlyPurchaseWidget = () => {
  return (
    <>
      <Card className="max-w-full">
        <CardHeader className="">
          <div className="w-full">
            <Image
              width={30}
              radius="none"
              alt="Orders"
              src="../../../src/assets/wallet.svg"
              className="float-left"
            />
            <span className="text-md uppercase font-semibold float-left pt-1 pl-3">
              Total
              <strong className="font-bold px-2 text-blue-600">JUNE</strong>
              Purchases
            </span>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid xl:grid-cols-3 xs:grid-cols-1 gap-2">
            <Card className="max-h-full h-auto w-full">
              <CardHeader className="justify-center">
                <p className="text-sm uppercase font-semibold"> orders</p>
              </CardHeader>
              <Divider />
              <CardBody className="text-center py-5">
                <p className="text-5xl font-bold text-primary-700 py-5">10</p>
              </CardBody>
            </Card>
            <Card className="max-h-full h-auto xl:col-span-2 xs:col-span-1">
              <CardHeader className="justify-center">
                <p className="text-sm uppercase font-semibold">Amount</p>
              </CardHeader>
              <Divider />
              <CardBody className="text-center py-5">
                <p className="text-2xl font-bold text-primary-700 py-5">
                  12,34,567.00
                </p>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TotalMonthlyPurchaseWidget;
