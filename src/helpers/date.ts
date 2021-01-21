const dateFormat = { day: '2-digit', month: '2-digit', year: 'numeric' };

export const dateToString = (dateValue: Date) => {
  return dateValue.toLocaleString('en-GB', dateFormat);
};
