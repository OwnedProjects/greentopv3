// Snackbar.tsx
import { useState, useEffect } from 'react';
import { Card } from "@heroui/react";
import classNames from 'classnames';

export type SnackbarProps = {
  message: string;
  type: 'success' | 'error';
  duration?: number; // in milliseconds
  snackkey: number; //Random number passed by Parent to re-render this component
};

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type,
  duration = 3000,
  snackkey,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      setVisible(false);
      clearTimeout(timer);
    };
  }, [duration, snackkey]);

  const snackbarClasses = classNames(
    'fixed top-20 right-4 p-4 rounded shadow-lg transition-transform transform z-50 min-w-[250px] max-w-[90%] capitalize',
    {
      'bg-green-500 text-white': type === 'success',
      'bg-red-500 text-white': type === 'error',
      'translate-y-0': visible,
      '-translate-y-40': !visible,
    }
  );

  return (
    <Card className={snackbarClasses}>
      <p>{message}</p>
    </Card>
  );
};

export default Snackbar;
