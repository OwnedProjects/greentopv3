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
} from "@heroui/react";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import CustomModal from '../../../components/Modal/CustomModal';
import { GenericError } from '../../../types/GenericError';
import { fetchProductsStockList } from '../_services/fetchProductsStockList';
import ViewStockHistory from './ViewStockHistory';

const columns = [
  {
    key: 'name',
    label: 'FINISHED PRODUCTS',
  },
  {
    key: 'quantity',
    label: 'QUANTITY',
  },
];

export type PRODMATS = {
  stockid: string;
  prodid: string;
  name: string;
  quantity: string;
};

const FinishedProductsList: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['']));
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PRODMATS>();

  const {
    isLoading,
    data: prodlist,
    error,
  } = useQuery<PRODMATS[], GenericError>({
    queryKey: ['product-list'],
    queryFn: fetchProductsStockList,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (error) {
    console.log('PRODUCT LIST ERROR ', error);
    if (error.status > 500) throw error;
  }
  const rows: PRODMATS[] = prodlist ? prodlist : [];

  const handleSelectionChange = (keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') {
      setSelectedKeys(new Set(rows.map((item) => item.name)));
    } else {
      setSelectedKeys(new Set(Array.from(keys) as string[]));
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedProduct(undefined);
  };

  useEffect(() => {
    if (selectedKeys.size > 0 && selectedKeys.has('')) {
      selectedKeys.delete('');
    }

    if (selectedKeys.size > 0) {
      const key = [...selectedKeys][0];
      if (prodlist) {
        setSelectedProduct(
          prodlist.filter(
            (x: PRODMATS) => x.prodid.toString() === key.toString()
          )[0]
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
                <p className="text-md uppercase font-semibold">
                  FINISHED PRODUCTS
                </p>
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
                      <TableRow key={item?.prodid}>
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
        title={selectedProduct?.name}
      >
        <ViewStockHistory stockid={Number(selectedProduct?.stockid)} />
      </CustomModal>
    </>
  );
};

export default FinishedProductsList;
