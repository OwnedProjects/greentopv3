import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';

const rows = [
  {
    key: '1',
    batchnm: 'Tony Reichert',
    quantity: '123 / 456',
  },
  {
    key: '2',
    batchnm: 'Zoey Lang',
    quantity: '123 / 456',
  },
  {
    key: '3',
    batchnm: 'Jane Fisher',
    quantity: '123 / 456',
  },
  {
    key: '4',
    batchnm: 'William Howard',
    quantity: '123 / 456',
  },
];

const columns = [
  {
    key: 'batchnm',
    label: 'Batch Id',
  },
  {
    key: 'quantity',
    label: 'QUANTITY',
  },
];

type BatchDetailsWidgetProps = {
  openModalCallback?: () => void;
};

const BatchDetailsWidget: React.FC<BatchDetailsWidgetProps> = () => {
  return (
    <>
      <Card className="max-w-full">
        <CardHeader className="flex gap-3">
          <Image
            width={30}
            radius="none"
            alt="Orders"
            src="../../../src/assets/packing.svg"
            className="float-left"
          />
          <span className="text-md uppercase font-semibold float-left pt-1">
            Total
            <strong className="font-bold px-2 text-blue-600">JUNE</strong>
            Batches
          </span>
        </CardHeader>
        <Divider />
        <CardBody>
          <Table color="secondary" selectionMode="single" removeWrapper>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  align={`${column.key === 'quantity' ? 'end' : 'start'}`}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default BatchDetailsWidget;
