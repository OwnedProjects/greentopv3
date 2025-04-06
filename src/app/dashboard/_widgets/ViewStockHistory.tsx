import {
  Code,
  Link,
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
import {
  StockHistory,
  fetchStockHistory,
} from '../_services/fetchStockHistory';
import { useState } from 'react';
import { constants } from '../../../config/settings';
import { GenericError } from '../../../types/GenericError';

type ViewStockHistoryProps = {
  stockid: number;
};

const ViewStockHistory = ({ stockid, ...args }: ViewStockHistoryProps) => {
  const [sortBy, setSortBy] = useState(constants.ASC);

  const { data, error, isLoading } = useQuery<StockHistory[], GenericError>({
    queryKey: ['stock-history-list', stockid, sortBy],
    queryFn: () => fetchStockHistory(stockid, sortBy),
    enabled: !!sortBy || !!stockid,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  if (error) {
    console.log('Stock History ', error);
    if (error.status > 500) throw error;
  }

  const handleSort = () => {
    sortBy === constants.ASC
      ? setSortBy(constants.DESC)
      : setSortBy(constants.ASC);
  };

  return isLoading ? (
    <>
      <Spinner label="Loading..." />
    </>
  ) : (
    <>
      {!error ? (
        <>
          <div className="flex gap-4">
            <Link
              underline="always"
              onClick={handleSort}
              className="cursor-pointer"
            >
              {sortBy === constants.ASC
                ? 'Sort By Latest Date'
                : 'Start from April'}
            </Link>
          </div>
          <Table aria-label="View Stock History" {...args}>
            <TableHeader>
              <TableColumn key="date">Date</TableColumn>
              <TableColumn key="openingstock">Opening Stock</TableColumn>
              <TableColumn key="INorOUT">IN/OUT</TableColumn>
              <TableColumn key="quantity">Quantity</TableColumn>
              <TableColumn key="closingstock">Closing Stock</TableColumn>
              <TableColumn key="remarks">Remarks</TableColumn>
            </TableHeader>
            <TableBody items={data ?? []} loadingContent={<Spinner />}>
              {(item) => (
                <TableRow key={item?.stockregid}>
                  {(columnKey) => (
                    <TableCell className="min-w-28">
                      {getKeyValue(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          <Code color="danger" className="text-balance">
            {JSON.stringify(error.message)}
          </Code>
        </>
      )}
    </>
  );
};

export default ViewStockHistory;
