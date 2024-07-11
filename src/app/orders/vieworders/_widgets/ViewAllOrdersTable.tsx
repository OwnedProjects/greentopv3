import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { OpenOrderType } from '../_services/fetchAllOrders';

type ViewAllOrdersTableProps = {
  allOrders: [] | OpenOrderType[] | undefined;
};
const ViewAllOrdersTable = ({ allOrders }: ViewAllOrdersTableProps) => {
  return (
    <>
      <div className="pt-2">
        <Table aria-label="View All Orders Table">
          <TableHeader>
            <TableColumn key="orderdate">Order Date</TableColumn>
            <TableColumn key="orderno">Order No.</TableColumn>
            <TableColumn key="custname">Customer</TableColumn>
            <TableColumn key="name">Product</TableColumn>
            <TableColumn key="quantity">Quantity</TableColumn>
            <TableColumn key="status">Order Status</TableColumn>
          </TableHeader>
          <TableBody items={allOrders} emptyContent={'No Orders to display.'}>
            {(item) => (
              <TableRow key={item?.orderid}>
                {(columnKey) => (
                  <TableCell className="min-w-28 capitalize">
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ViewAllOrdersTable;
