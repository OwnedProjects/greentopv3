import {
  Button,
  Card,
  CardBody,
  Code,
  Divider,
  Image,
  Spinner,
} from '@nextui-org/react';
import AutoFillDateInput from '../../../components/AutoFillDateInput.tsx';
import { useState } from 'react';
import ViewAllOrdersTable from './_widgets/ViewAllOrdersTable.tsx';
import { fetchAllOrders, OpenOrderType } from './_services/fetchAllOrders.ts';
import { useQuery } from '@tanstack/react-query';
import { GenericError } from '../../../types/GenericError.ts';

const ViewOrders = () => {
  const [fromDt, setFromDt] = useState('');
  const [toDt, setToDt] = useState('');

  const {
    isLoading: loadingOrders,
    data: allOrders,
    error: ordersError,
    refetch: refetchOpenOrders,
  } = useQuery<OpenOrderType[] | [], GenericError>({
    queryKey: ['vieworders-allorders-list'],
    queryFn: () => fetchAllOrders({ fromDt, toDt }),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handleDate = (newDt: string, type: string) => {
    if (type === 'fromDt') {
      setFromDt(newDt);
    } else {
      setToDt(newDt);
    }
  };
  const handleFilterData = () => {
    console.log('FILTER');
    refetchOpenOrders();
    // TODO: Work on REFETCH
  };

  return (
    <>
      <Card radius="none">
        <CardBody className="py-3">
          <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-6">
            <div className="grid">
              <div className="mt-3 font-semibold">Order Timeline:</div>
            </div>

            <div className="grid">
              <div className="grid lg:grid-cols-3 xs:grid-cols-1 gap-6 pb-3">
                <div className="grid">
                  <AutoFillDateInput
                    size="sm"
                    label="From Date (DD-MM-YYYY)"
                    value={fromDt}
                    onChange={(e) => handleDate(e, 'fromDt')}
                  />
                </div>
                <div className="grid">
                  <AutoFillDateInput
                    size="sm"
                    label="To Date (DD-MM-YYYY)"
                    value={toDt}
                    onChange={(e) => handleDate(e, 'toDt')}
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
                        alt="View Orders"
                        src="../../../src/assets/filters.svg"
                      />
                    }
                    isDisabled={!fromDt || !toDt}
                    onPress={handleFilterData}
                  >
                    Filter
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Divider />

          {ordersError ? (
            <>
              <Code color="danger" className="text-balance">
                {JSON.stringify(ordersError.message)}
              </Code>
            </>
          ) : (
            <>
              {loadingOrders ? (
                <Spinner />
              ) : (
                <ViewAllOrdersTable allOrders={allOrders} />
              )}
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default ViewOrders;
