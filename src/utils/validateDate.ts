export const validateDate = (date: string) => {
  const dateReg = /^\d{2}-\d{2}-\d{4}$/;
  return date.match(dateReg);
};
