import {
  Button,
  Card,
  CardBody,
  getKeyValue,
  Image,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { DeliveryFormBatch } from '../_types/DispatchTypes';

type ManufactureBatchListProps = {
  batches: DeliveryFormBatch[];
  handleRemoveBatches: (batch: DeliveryFormBatch) => void;
  dispatchOrder: () => void;
};

const ManufactureBatchList = ({
  batches,
  handleRemoveBatches,
  dispatchOrder,
}: ManufactureBatchListProps) => {
  return (
    <>
      {batches?.length ? (
        <Card radius="none" className="mt-1 mb-3">
          <CardBody>
            <Table
              aria-label="All Batches Table"
              className="my-2"
              radius="none"
            >
              <TableHeader>
                <TableColumn key="batchid" className="bg-black text-white">
                  Batch ID
                </TableColumn>
                <TableColumn key="qtyproduced" className="bg-black text-white">
                  Original Quantity Produced
                </TableColumn>
                <TableColumn key="qtyremained" className="bg-black text-white">
                  Original Remained Quantity
                </TableColumn>
                <TableColumn key="selectedqty" className="bg-black text-white">
                  New Selected Quantity
                </TableColumn>
                <TableColumn key="remove" className="bg-black text-white">
                  Remove
                </TableColumn>
              </TableHeader>
              <TableBody items={batches ?? []} loadingContent={<Spinner />}>
                {(item) => (
                  <TableRow key={item?.batchmastid}>
                    {(columnKey) => {
                      return columnKey !== 'remove' ? (
                        <TableCell className="min-w-28">
                          {getKeyValue(item, columnKey)}
                        </TableCell>
                      ) : (
                        <TableCell className="min-w-28">
                          <Link
                            underline="always"
                            onClick={() => handleRemoveBatches(item)}
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
              className="max-w-60 uppercase"
              onPress={dispatchOrder}
              startContent={
                <Image
                  width={25}
                  radius="none"
                  alt="Dispatches Order"
                  src="../../../src/assets/truck-white2.svg"
                />
              }
            >
              Dispatch Order
            </Button>
          </CardBody>
        </Card>
      ) : (
        ''
      )}
    </>
  );
};

export default ManufactureBatchList;
