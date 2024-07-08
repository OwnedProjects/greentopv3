import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import { ConsigneeForm, NewOrderType } from '../_types/NewOrderTypes';

type AllConsigneesProps = {
  orderDetails: NewOrderType;
  handleRemoveConsignees: (consignee: ConsigneeForm) => void;
  placeOrder: () => void;
};
const AllConsignees = ({
  orderDetails,
  handleRemoveConsignees,
  placeOrder,
}: AllConsigneesProps) => {
  const { consignee } = orderDetails;
  return (
    <>
      <Card className="my-2" radius="none">
        <CardHeader className="pb-0">
          <span className="text-md text-semibold text-blue-500">
            All Consignee
          </span>
        </CardHeader>

        <CardBody className="py-0 pb-2">
          <Table
            aria-label="All Consignees Table"
            className="my-2"
            radius="none"
          >
            <TableHeader>
              <TableColumn key="consigneeType">SELF/CONSIGNEE</TableColumn>
              <TableColumn key="contactPerson">Consignee Name</TableColumn>
              <TableColumn key="quantity">Quantity</TableColumn>
              <TableColumn key="city">City</TableColumn>
              <TableColumn key="state">State</TableColumn>
              <TableColumn key="remove">Remove</TableColumn>
            </TableHeader>
            <TableBody items={consignee ?? []} loadingContent={<Spinner />}>
              {(item) => (
                <TableRow key={item?.keyid}>
                  {(columnKey) => {
                    return columnKey !== 'remove' ? (
                      <TableCell className="min-w-28">
                        {getKeyValue(item, columnKey)}
                      </TableCell>
                    ) : (
                      <TableCell className="min-w-28">
                        <Link
                          underline="always"
                          onClick={() => handleRemoveConsignees(item)}
                          className="cursor-pointer text-sm"
                        >
                          Remove
                        </Link>
                      </TableCell>
                    );
                  }}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Button
            color="primary"
            radius="none"
            className="max-w-40 uppercase"
            onPress={placeOrder}
            startContent={
              <Image
                width={25}
                radius="none"
                alt="Orders"
                src="../../../src/assets/orders-cart-white.svg"
              />
            }
          >
            Place Order
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default AllConsignees;
