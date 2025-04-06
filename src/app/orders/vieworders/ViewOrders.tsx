import {
  Button,
  Card,
  CardBody,
  Code,
  Divider,
  Image,
  Spinner,
} from "@heroui/react";
import AutoFillDateInput from '../../../components/AutoFillDateInput.tsx';
import { useState } from 'react';
import ViewAllOrdersTable from './_widgets/ViewAllOrdersTable.tsx';
import { fetchAllOrders, OpenOrderType } from './_services/fetchAllOrders.ts';
import { useQuery } from '@tanstack/react-query';
import { GenericError } from '../../../types/GenericError.ts';
import { constants } from '../../../config/settings.ts';

const ViewOrders = () => {
  const [fromDt, setFromDt] = useState('');
  const [toDt, setToDt] = useState('');
  const [timeline, setTimeline] = useState<string | null>(null);

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
    setTimeline(`${fromDt} -- ${toDt}`);
    refetchOpenOrders();
  };

  return (
    <>
      <Card radius="none">
        <CardBody className="py-3">
          <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-6">
            <div className="grid">
              <div className="mt-3 text-sm">
                Order Timeline:
                {timeline ? (
                  <span className="font-bold border-b-1 border-cyan-600 pb-1 mx-2">
                    {timeline}
                  </span>
                ) : (
                  <>
                    <span className="font-bold border-b-1 border-cyan-600 pb-1 mx-2">
                      {constants.CURRENT_FINANCIAL_YEAR}
                    </span>
                  </>
                )}
              </div>
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
