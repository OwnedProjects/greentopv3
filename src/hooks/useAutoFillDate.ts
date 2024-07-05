// useAutoFillDate.ts
const useAutoFillDate = () => {
  const currentYear = new Date().getFullYear();
  // const nextYear = currentYear + 1;

  const formatInputDate = (input: string) => {
    const regex = /^(\d{1,2})[-/](\d{1,2})$/; // Updated regex

    if (regex.test(input)) {
      const [, day, month] = input.match(regex) || []; // Removed unused variable

      const now = new Date();
      now.setHours(0, 0, 0, 0);
      // const inputDate = new Date(`${now.getFullYear()}-${month}-${day}`);

      // const inputYear = inputDate < now ? nextYear : currentYear;

      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${currentYear}`;
    }

    return input;
  };

  return { formatInputDate };
};

export default useAutoFillDate;
