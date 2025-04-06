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
import { OrderDetailsConsignee } from '../_types/OrderDetailsType';

type OrderDetailsConsigneesProps = {
  consignees: OrderDetailsConsignee[];
  consigneeType: string;
};
const OrderDetailsConsignees = ({
  consignees,
  consigneeType,
}: OrderDetailsConsigneesProps) => {
  return (
    <>
      {consignees?.length ? (
        <Card radius="none">
          <CardBody className="py-3">
            <div className="font-semibold text-blue-600 pb-2">
              All Consignees
            </div>
            <div className="font-semibold pb-2 text-violet-600 ">
              Consignee:{' '}
              <span className="border-b-1 border-violet-600">
                {consigneeType}
              </span>
            </div>
            <Table
              aria-label="View All Order Consignees"
              radius="none"
              removeWrapper
            >
              <TableHeader>
                <TableColumn key="consigneename">Consignee</TableColumn>
                <TableColumn key="contactperson">Contact Person</TableColumn>
                <TableColumn key="contactnumber">Contact Number</TableColumn>
                <TableColumn key="quantity">Quantity (tons)</TableColumn>
                <TableColumn key="city">City</TableColumn>
                <TableColumn key="deliveryaddress">
                  Delivery Address
                </TableColumn>
              </TableHeader>
              <TableBody
                items={consignees}
                emptyContent={'No Consignees to display.'}
              >
                {(item) => (
                  <TableRow key={item.orderconsignid}>
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
        <></>
      )}
    </>
  );
};

export default OrderDetailsConsignees;
