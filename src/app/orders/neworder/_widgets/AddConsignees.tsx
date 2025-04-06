import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  InputProps,
} from "@heroui/react";
import React, { useState, useCallback, useEffect } from 'react';

import { CustomerTypes } from '../../../customer/_types/CustomerTypes';
import { constants } from '../../../../config/settings';
import { ConsigneeForm } from '../_types/NewOrderTypes';

const inputprops: InputProps = {
  radius: 'none',
  variant: 'bordered',
  fullWidth: true,
  isRequired: true,
  size: 'sm',
  type: 'text',
};

const defaultFormVals: ConsigneeForm = {
  name: '',
  contactPerson: '',
  contactNumber: '',
  consigneeAddress: '',
  city: '',
  state: '',
  quantity: '',
  gst: '',
  deliveryAddress: '',
  consigneeType: constants.SELF,
};

type AddConsigneeProps = {
  handleAddConsignee: (consigneeFormVals: ConsigneeForm) => void;
  selCust?: CustomerTypes;
  quantity?: string;
};

const AddConsignees = ({
  handleAddConsignee,
  selCust = {} as CustomerTypes,
  quantity,
}: AddConsigneeProps) => {
  const [sendToSelf, setSendToSelf] = useState(true);
  const [formData, setFormData] = useState(defaultFormVals);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    []
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Consignee Name is required';
    if (!formData.contactPerson.trim())
      newErrors.contactPerson = 'Contact Person is required';
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = 'Contact Number is required';
    if (!formData.consigneeAddress.trim())
      newErrors.consigneeAddress = 'Consignee Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.quantity.trim() || !parseFloat(formData.quantity.trim()))
      newErrors.quantity = 'Quantity is required';

    if (!formData.deliveryAddress.trim())
      newErrors.deliveryAddress = 'Delivery Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddConsignee({
        ...formData,
        consigneeType: sendToSelf ? constants.SELF : constants.CONSIGNEE,
        keyid: new Date().getTime(),
      });
      setFormData({ ...defaultFormVals, consigneeType: constants.CONSIGNEE });
      setSendToSelf(false);
    } else {
      console.log('Form has errors:', errors);
    }
  };

  useEffect(() => {
    if (sendToSelf && selCust.clientid && quantity) {
      //SEND TO SELF
      setFormData({
        name: selCust.name,
        contactPerson: selCust.contactperson1,
        contactNumber: selCust.contactno,
        consigneeAddress: selCust.address,
        city: selCust.city,
        state: selCust.state,
        quantity: quantity || '',
        gst: selCust.gstno,
        deliveryAddress: selCust.address,
        consigneeType: sendToSelf ? constants.SELF : constants.CONSIGNEE,
      });
    } else {
      setFormData(defaultFormVals);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendToSelf, selCust.clientid, quantity]);

  return (
    <Card className="my-2" radius="none">
      <CardHeader className="pb-0">
        <span className="text-md text-semibold text-blue-500">
          Add Consignee
        </span>
      </CardHeader>

      <CardBody className="py-0">
        <div className="grid lg:grid-cols-12 xs:grid-cols-1 gap-6 pb-3">
          <div className="grid sm:col-span-2 xs:grid-cols-1 justify-center">
            <Checkbox
              radius="full"
              isSelected={sendToSelf}
              onValueChange={setSendToSelf}
              isDisabled={!selCust.clientid}
            >
              Send order to SELF
            </Checkbox>
          </div>
          <div className="grid sm:col-span-6 xs:grid-cols-1">
            <Input
              label="Consignee Name"
              {...inputprops}
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              isInvalid={!!errors.name}
              errorMessage={errors.name}
            />
          </div>
          <div className="grid sm:col-span-2 xs:grid-cols-1">
            <Input
              label="Consignee Contact Person"
              {...inputprops}
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleFormChange}
              isInvalid={!!errors.contactPerson}
              errorMessage={errors.contactPerson}
            />
          </div>
          <div className="grid sm:col-span-2 xs:grid-cols-1">
            <Input
              label="Consignee Contact Number"
              {...inputprops}
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleFormChange}
              isInvalid={!!errors.contactNumber}
              errorMessage={errors.contactNumber}
            />
          </div>
          <div className="grid sm:col-span-5 xs:grid-cols-1">
            <Input
              label="Consignee Address"
              {...inputprops}
              name="consigneeAddress"
              value={formData.consigneeAddress}
              onChange={handleFormChange}
              isInvalid={!!errors.consigneeAddress}
              errorMessage={errors.consigneeAddress}
            />
          </div>
          <div className="grid sm:col-span-2 xs:grid-cols-1">
            <Input
              label="Consignee City"
              {...inputprops}
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              isInvalid={!!errors.city}
              errorMessage={errors.city}
            />
          </div>
          <div className="grid sm:col-span-3 xs:grid-cols-1">
            <Input
              label="Consignee State"
              {...inputprops}
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              isInvalid={!!errors.state}
              errorMessage={errors.state}
            />
          </div>
          <div className="grid sm:col-span-2 xs:grid-cols-1">
            <Input
              label="Quantity"
              type="number"
              {...inputprops}
              name="quantity"
              value={formData.quantity}
              onChange={handleFormChange}
              isInvalid={!!errors.quantity}
              errorMessage={errors.quantity}
            />
          </div>
          <div className="grid sm:col-span-4 xs:grid-cols-1">
            <Input
              label="Consignee GST"
              {...inputprops}
              name="gst"
              value={formData.gst}
              onChange={handleFormChange}
              isRequired={false}
            />
          </div>
          <div className="grid sm:col-span-8 xs:grid-cols-1">
            <Input
              label="Delivery Address"
              {...inputprops}
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleFormChange}
              isInvalid={!!errors.deliveryAddress}
              errorMessage={errors.deliveryAddress}
            />
          </div>
          <div className="grid sm:col-span-12 xs:grid-cols-1">
            <Button
              size="sm"
              variant="solid"
              color={!selCust.clientid || !quantity ? 'default' : 'primary'}
              radius="none"
              className="max-w-40 uppercase"
              onPress={handleSubmit}
              isDisabled={!selCust.clientid || !quantity}
            >
              Add Consignee
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AddConsignees;
