import {
  Card,
  CardBody,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { OrderDetailsDispatch } from '../_types/OrderDetailsType';

type OrderDetailsDispatchesProps = {
  dispatches: OrderDetailsDispatch[];
};

const OrderDetailsDispatches = ({
  dispatches,
}: OrderDetailsDispatchesProps) => {
  return (
    <>
      {dispatches?.length ? (
        <Card radius="none">
          <CardBody className="py-3">
            <div className="font-semibold text-blue-600 pb-2">
              All Batches & Dispatch Details
            </div>

            <div className="grid lg:grid-cols-6 xs:grid-cols-1 gap-6 pb-2 text-violet-700 font-semibold">
              <div className="grid">DC No: {dispatches?.[0]?.dcno}</div>
              <div className="grid">
                Dispatch Date: {dispatches?.[0]?.dispatchdate}
              </div>
            </div>
            <Table
              aria-label="View All Order Batches"
              radius="none"
              removeWrapper
            >
              <TableHeader>
                <TableColumn key="batchid">Batch ID</TableColumn>
                <TableColumn key="batchdate">Batch Date</TableColumn>
                <TableColumn key="quantity">Quantity (tons)</TableColumn>
              </TableHeader>
              <TableBody
                items={dispatches}
                emptyContent={'No Batches to display.'}
              >
                {(item) => (
                  <TableRow key={item.batchid}>
                    {(columnKey) => (
                      <TableCell className="min-w-15 capitalize">
                        {getKeyValue(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      ) : (
        ''
      )}
    </>
  );
};

export default OrderDetailsDispatches;
