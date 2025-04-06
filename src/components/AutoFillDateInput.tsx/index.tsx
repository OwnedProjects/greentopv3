// AutoFillDateInput.tsx
import React, { useState } from 'react';
import { Input } from "@heroui/react";
import useAutoFillDate from '../../hooks/useAutoFillDate';
import { validateDate } from '../../utils/validateDate';

type AutoFillDateInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg' | undefined;
};

const AutoFillDateInput: React.FC<AutoFillDateInputProps> = ({
  label,
  value,
  onChange,
  size = 'sm',
  ...rest
}) => {
  const { formatInputDate } = useAutoFillDate();
  const [invalidDate, setInvalidDate] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatInputDate(event.target.value);
    onChange(formattedDate);
  };

  const handleBlur = () => {
    if (!validateDate(value)) {
      setInvalidDate(true);
    } else {
      setInvalidDate(false);
    }
  };

  return (
    <Input
      type="text"
      label={label}
      radius="none"
      variant="bordered"
      fullWidth
      isRequired
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      size={size}
      isInvalid={!!invalidDate}
      errorMessage="Invalid Date"
      {...rest}
    />
  );
};

export default AutoFillDateInput;
