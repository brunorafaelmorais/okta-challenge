import { parseISO, isBefore } from 'date-fns';

const isValidRangeDate = (dateBegin: string, dateEnd: string): boolean => {
  const parsedDateBegin = parseISO(dateBegin);
  const parsedDateEnd = parseISO(dateEnd);

  if (isBefore(parsedDateEnd, parsedDateBegin)) {
    return false;
  }

  return true;
};

export default isValidRangeDate;
