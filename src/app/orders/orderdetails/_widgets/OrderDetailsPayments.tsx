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
} from "@heroui/react";
import { OrderDetailsPaymentsType } from '../_types/OrderDetailsType';

type OrderDetailsPaymentsProps = {
  payments: OrderDetailsPaymentsType[];
};

const OrderDetailsPayments = ({ payments }: OrderDetailsPaymentsProps) => {
  return (
    <>
      {payments?.length ? (
        <Card radius="none">
          <CardBody className="py-3">
            <div className="font-semibold text-blue-600 pb-2">
              Bill And Payment Details
            </div>

            <div className="grid lg:grid-cols-6 xs:grid-cols-1 gap-6 pb-2 text-violet-700 font-semibold">
              <div className="grid">Bill No: {payments?.[0]?.billno}</div>
              <div className="grid">Bill Date: {payments?.[0]?.billdate}</div>
            </div>
            <Table
              aria-label="View All Order Batches"
              radius="none"
              removeWrapper
            >
              <TableHeader>
                <TableColumn key="rate">Rate (Rs.)</TableColumn>
                <TableColumn key="amount">Amount (Rs.)</TableColumn>
                <TableColumn key="discount">Discount</TableColumn>
                <TableColumn key="cgstAmt">CGST Amount</TableColumn>
                <TableColumn key="sgstAmt">SGST Amount</TableColumn>
                <TableColumn key="igstAmt">IGST Amount</TableColumn>
                <TableColumn key="roundoff">RoundOff</TableColumn>
                <TableColumn key="totalamount">Total Amount</TableColumn>
              </TableHeader>
              <TableBody
                items={payments}
                emptyContent={'No Payments to display.'}
              >
                {(item) => (
                  <TableRow key={item.otaxinvoiceid}>
                    {(columnKey) =>
                      columnKey === 'cgstAmt' ? (
                        <TableCell className="min-w-15 capitalize">
                          {getKeyValue(item, columnKey)} (
                          {getKeyValue(item, 'cgst')} %)
                        </TableCell>
                      ) : columnKey === 'sgstAmt' ? (
                        <TableCell className="min-w-15 capitalize">
                          {getKeyValue(item, columnKey)} (
                          {getKeyValue(item, 'sgst')} %)
                        </TableCell>
                      ) : columnKey === 'igstAmt' ? (
                        <TableCell className="min-w-15 capitalize">
                          {getKeyValue(item, columnKey)} (
                          {getKeyValue(item, 'igst')} %)
                        </TableCell>
                      ) : (
                        <TableCell className="min-w-15 capitalize">
                          {getKeyValue(item, columnKey)}
                        </TableCell>
                      )
                    }
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

export default OrderDetailsPayments;
