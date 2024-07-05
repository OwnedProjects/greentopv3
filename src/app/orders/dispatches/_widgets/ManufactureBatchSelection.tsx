import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Code,
  Input,
  Spinner,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Key, useEffect, useState } from 'react';
import { constants } from '../../../../config/settings';
import { GenericError } from '../../../../types/GenericError';
import { fetchOpenProductBatches } from '../_services/fetchOpenProductBatches';
import { OpenProductBatchType } from '../_types/DispatchTypes';
import { inputprops } from '../../../../types/GenericInputProps';

type ManufactureBatchSelectionProps = {
  prodid: number;
};

const ManufactureBatchSelection = ({
  prodid,
}: ManufactureBatchSelectionProps) => {
  const [selKey, setSelKey] = useState<string | undefined>(undefined);
  const [selectedBatch, setSelectedBatch] = useState<
    OpenProductBatchType | undefined
  >(undefined);
  const [selectedColor, setSelectedColor] = useState<
    'primary' | 'danger' | 'warning'
  >();
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  useEffect(() => {
    setSelectedBatch(undefined);
    setSelectedColor(undefined);
    setSelKey(undefined);
  }, [allBatches]);

  const handleBatchSelection = (key: Key | null) => {
    setSelKey(key as string);
    const selBatch =
      allBatches?.filter(
        (x) => x.batchmastid.toString() === key?.toString()
      )?.[0] || undefined;
    setSelectedBatch(selBatch);
    const perc = selBatch
      ? (parseFloat(selBatch?.qtyremained) /
          parseFloat(selBatch?.qtyproduced)) *
        100
      : 0;
    setSelectedColor(
      perc < 50 ? 'danger' : perc >= 50 && perc < 100 ? 'warning' : 'primary'
    );
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (
      selectedBatch &&
      parseFloat(quantity.trim()) > parseFloat(selectedBatch.qtyremained)
    ) {
      newErrors.name = 'Quantity cannot be more than remaining batch';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBatch = () => {
    if (validateForm()) {
      console.log('Add success');
      //TODO Add a callback to add the batch to the parent object
    }
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
              <div className="grid lg:grid-cols-3 xs:grid-cols-1 gap-6 pb-3">
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

                      {selectedBatch && (
                        <span className="text-sm ">
                          Dated:{' '}
                          <span className="text-blue-600 font-semibold pr-2">
                            {selectedBatch?.manufacdateDDMMYYYY}
                          </span>
                          | Quantity Remained
                          <Chip color={selectedColor} size="sm" className="m-2">
                            {selectedBatch.qtyremained}
                          </Chip>
                        </span>
                      )}
                    </>
                  )}
                </div>

                <div className="grid">
                  <Input
                    label="Enter Quantity"
                    {...inputprops}
                    value={quantity}
                    onChange={handleQuantity}
                    isDisabled={!selectedBatch}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name}
                  />
                </div>
                <div className="grid">
                  <Button
                    radius="none"
                    color="primary"
                    className="max-w-[100px]"
                    size="lg"
                    isDisabled={!selectedBatch || !quantity}
                    onClick={handleAddBatch}
                  >
                    Add Batch
                  </Button>
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
