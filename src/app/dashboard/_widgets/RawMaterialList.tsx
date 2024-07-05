import {
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import CustomModal from '../../../components/Modal/CustomModal';
import { GenericError } from '../../../types/GenericError';
import { fetchRawMaterialStockList } from '../_services/fetchRawMaterialStockList';
import ViewStockHistory from './ViewStockHistory';

const columns = [
  {
    key: 'name',
    label: 'RAW MATERIAL',
  },
  {
    key: 'quantity',
    label: 'QUANTITY',
  },
];

export type RawMat = {
  stockid: string;
  rawmatid: string;
  name: string;
  quantity: string;
};

const RawMaterialList: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['']));
  const [openModal, setOpenModal] = useState(false);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState<RawMat>();

  const {
    isLoading,
    data: rawmatlist,
    error,
  } = useQuery<RawMat[], GenericError>({
    queryKey: ['raw-material-list'],
    queryFn: fetchRawMaterialStockList,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (error) {
    console.log('RAW MAT ERROR ', error);
    if (error.status > 500) throw error;
  }
  const rows: RawMat[] = rawmatlist ? rawmatlist : [];

  const handleSelectionChange = (keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') {
      setSelectedKeys(new Set(rows.map((item) => item.rawmatid)));
    } else {
      setSelectedKeys(new Set(Array.from(keys) as string[]));
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedRawMaterial(undefined);
  };

  useEffect(() => {
    if (selectedKeys.size > 0 && selectedKeys.has('')) {
      selectedKeys.delete('');
    }

    if (selectedKeys.size > 0) {
      const key = [...selectedKeys][0];
      if (rawmatlist) {
        setSelectedRawMaterial(
          rawmatlist.filter((x) => x.rawmatid.toString() === key.toString())[0]
        );
      }
      setOpenModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys]);

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
              <div className="flex flex-col">
                <p className="text-md uppercase font-semibold">Raw Materials</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              {isLoading ? (
                <Spinner label="Loading..." />
              ) : (
                <Table
                  color="secondary"
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={handleSelectionChange}
                  removeWrapper
                >
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
                      <TableRow key={item?.rawmatid}>
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
      <CustomModal
        openModal={openModal}
        handleModalClose={handleModalClose}
        placement="top"
        title={selectedRawMaterial?.name}
      >
        <ViewStockHistory stockid={Number(selectedRawMaterial?.stockid)} />
      </CustomModal>
    </>
  );
};

export default RawMaterialList;
