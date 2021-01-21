const dateFormat = { day: '2-digit', month: '2-digit', year: 'numeric' };

export const dateToString = (dateValue: Date) => {
  return dateValue.toLocaleString('en-GB', dateFormat);
};

export const calculateWorkDays = () => {
  const dateNow = new Date();

  const dayNumber = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth() + 1,
    0
  ).getDate();

  let currentDay = 1;
  let holydays = 0;

  const firstDay = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    currentDay
  );
  const weekDay = firstDay.getDay();
  let isSat = true;

  if (weekDay === 0) {
    isSat = false;
  } else if (weekDay !== 6) {
    currentDay += 6 - weekDay;
  }

  while (currentDay <= dayNumber) {
    holydays += 1;

    if (isSat) {
      currentDay += 1;
    } else {
      currentDay += 6;
    }

    isSat = !isSat;
  }

  return dayNumber - holydays;
};
