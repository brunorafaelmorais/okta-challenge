import { format, parseISO } from 'date-fns';

const formatDate = (date: string, formatStr: string): string => {
  const parsedDate = parseISO(date);

  const formattedDate = format(parsedDate, formatStr);

  return formattedDate;
};

export default formatDate;
