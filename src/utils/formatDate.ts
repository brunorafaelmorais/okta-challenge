import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const formatDate = (date: string, formatStr: string): string => {
  const parsedDate = parseISO(date);
  const znDate = utcToZonedTime(parsedDate, 'UTC');

  const formattedDate = format(znDate, formatStr);

  return formattedDate;
};

export default formatDate;
