import {
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Image,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import { OpenBatches, fetchOpenBatches } from '../_services/fetchOpenBatches';
import { useQuery } from '@tanstack/react-query';
import { GenericError } from '../../../types/GenericError';

const columns = [
  {
    key: 'batchid',
    label: 'Batch Id',
  },
  {
    key: 'quantity',
    label: 'REMAINED / PRODUCED',
  },
];

const BatchDetailsWidget: React.FC = () => {
  const {
    isLoading,
    data: openbatches,
    error,
  } = useQuery<OpenBatches[], GenericError>({
    queryKey: ['batches-list'],
    queryFn: fetchOpenBatches,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (error) {
    console.log('BATCHES LIST ERROR ', error);
    if (error.status > 500) throw error;
  }

  const opnBatch = openbatches
    ? openbatches?.map((x) => ({
        ...x,
        quantity: `${x.qtyremained} / ${x.qtyproduced}`,
      }))
    : [];
  const rows: OpenBatches[] = opnBatch;

  return (
    <>
      {error ? (
        <>
          <Code color="danger" className="text-balance">
            {JSON.stringify(error.message)}
          </Code>
        </>
      ) : (
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
                <strong className="font-bold px-2 text-blue-600">ACTIVE</strong>
                Batches
              </span>
            </CardHeader>
            <Divider />
            <CardBody>
              {isLoading ? (
                <Spinner label="Loading..." />
              ) : (
                <Table color="secondary" removeWrapper>
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={rows}
                    emptyContent={'No Batches to display.'}
                  >
                    {(item) => (
                      <TableRow key={item.batchmastid}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};

export default BatchDetailsWidget;
