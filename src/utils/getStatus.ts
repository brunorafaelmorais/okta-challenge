import { parseISO, isBefore, isAfter } from 'date-fns';

const getStatus = (dateBegin: string, dateEnd: string): string => {
  const parsedDateBegin = parseISO(dateBegin);
  const parsedDateEnd = parseISO(dateEnd);

  if (
    isAfter(new Date(), parsedDateBegin) &&
    isBefore(new Date(), parsedDateEnd)
  ) {
    return 'Live';
  }

  if (
    isAfter(new Date(), parsedDateBegin) &&
    isAfter(new Date(), parsedDateEnd)
  ) {
    return 'Closed';
  }

  return 'Schedule';
};

export default getStatus;
