import { parseISO, isBefore, isAfter } from 'date-fns';

export default function showStatus(dateBegin: string, dateEnd: string): string {
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
}
