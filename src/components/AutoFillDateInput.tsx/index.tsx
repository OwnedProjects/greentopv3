// AutoFillDateInput.tsx
import React from 'react';
import { Input } from '@nextui-org/react';
import useAutoFillDate from '../../hooks/useAutoFillDate';

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
}) => {
  const { formatInputDate } = useAutoFillDate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatInputDate(event.target.value);
    onChange(formattedDate);
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
      size={size}
    />
  );
};

export default AutoFillDateInput;
