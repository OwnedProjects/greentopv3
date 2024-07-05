import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardHeader,
  Code,
  Spinner,
} from '@nextui-org/react';
import { constants } from '../../../../config/settings';
import { OpenProductBatchType } from '../_types/DispatchTypes';
import { fetchOpenProductBatches } from '../_services/fetchOpenProductBatches';
import { GenericError } from '../../../../types/GenericError';
import { useQuery } from '@tanstack/react-query';
import { Key, useState } from 'react';

type ManufactureBatchSelectionProps = {
  prodid: number;
};

const ManufactureBatchSelection = ({
  prodid,
}: ManufactureBatchSelectionProps) => {
  const [selKey, setSelKey] = useState<string | undefined>();
  const [selectedBatch, setSelectedBatch] = useState<OpenProductBatchType>();

  const {
    isLoading,
    data: allBatches,
    error: batchesError,
  } = useQuery<OpenProductBatchType[] | [], GenericError>({
    queryKey: ['dispatches-openprodbatches-list', prodid],
    queryFn: () => fetchOpenProductBatches(prodid),
    enabled: !!prodid,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handleBatchSelection = (key: Key | null) => {
    setSelKey(key as string);
    setSelectedBatch(
      allBatches?.filter(
        (x) => x.batchmastid.toString() === key?.toString()
      )?.[0] || undefined
    );
  };

  return (
    <>
      {batchesError ? (
        <>
          <Code color="danger" className="text-balance">
            {JSON.stringify(batchesError.message)}
          </Code>
        </>
      ) : (
        <>
          <Card radius="none" className="mt-1">
            <CardHeader className="pb-0">
              <span className="text-sm font-semibold text-blue-500">
                {constants.SELECT_MANUFACTURE_BATCH}
              </span>
            </CardHeader>
            <CardBody className="pt-1">
              <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-6 pb-3">
                <div className="grid">
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <Autocomplete
                        defaultItems={allBatches}
                        label="Select a Batch"
                        size="sm"
                        variant="bordered"
                        radius="none"
                        selectedKey={selKey}
                        onSelectionChange={handleBatchSelection}
                        isRequired
                        fullWidth
                      >
                        {(batch) => (
                          <AutocompleteItem key={batch.batchmastid}>
                            {batch.batchid}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      <span>
                        Dated: {} | Quantity Remained <span>{}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};

export default ManufactureBatchSelection;
