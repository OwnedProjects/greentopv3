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
import {
  DeliveryFormBatch,
  OpenProductBatchType,
} from '../_types/DispatchTypes';
import { inputprops } from '../../../../types/GenericInputProps';
import Snackbar, {
  SnackbarProps,
} from '../../../../components/Snackbar/Snackbar';

type ManufactureBatchSelectionProps = {
  prodid: number;
  batches: DeliveryFormBatch[];
  handleAddBatchToDispatch: (batch: DeliveryFormBatch) => void;
};

const ManufactureBatchSelection = ({
  prodid,
  batches,
  handleAddBatchToDispatch,
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
  const [resetKey, setResetKey] = useState(0); // Add a reset key to force reset
  const [snackbar, setSnackbar] = useState<SnackbarProps | null>(null);

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
    // Check if Batch already exists in the dispatches.batches list, if yes don't add just return with error
    const isBatchAlreadyAdded = batches.find(
      (x) => x.batchmastid.toString() === key?.toString()
    );
    if (isBatchAlreadyAdded) {
      setSnackbar({
        message:
          'This Batch is already added, please remove it from final list below.',
        type: 'error',
        duration: 4000,
        snackkey: new Date().getTime(),
      });
      setSelKey(undefined);
      setSelectedBatch(undefined);
      setResetKey(resetKey + 1);
      return;
    }

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
      if (selectedBatch) {
        const remqty =
          parseFloat(selectedBatch.qtyremained) - parseFloat(quantity);
        handleAddBatchToDispatch({
          batchid: selectedBatch.batchid,
          batchmastid: selectedBatch.batchmastid,
          qtyproduced: selectedBatch.qtyproduced,
          qtyremained: selectedBatch.qtyremained,
          newqtyremained: remqty,
          selectedqty: parseFloat(quantity).toFixed(3),
          status: remqty > 0 ? 'open' : 'closed',
        });
        setSelKey(undefined);
        setResetKey(resetKey + 1);
        setQuantity('');
        setSelectedBatch(undefined);
      } else {
        setSnackbar({
          message: 'Batch selection error, please refresh and start over',
          type: 'error',
          duration: 3000,
          snackkey: new Date().getTime(),
        });
      }
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
                        key={`batch-${resetKey}`} // Use reset key to force reset
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
                    onPress={handleAddBatch}
                  >
                    Add Batch
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}
      {snackbar && (
        <Snackbar
          snackkey={snackbar.snackkey} // Use the unique key to force re-render
          message={snackbar.message}
          type={snackbar.type}
          duration={snackbar.duration}
        />
      )}
    </>
  );
};

export default ManufactureBatchSelection;
